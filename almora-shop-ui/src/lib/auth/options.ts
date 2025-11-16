import { print } from "graphql";
import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import setCookieParser from "set-cookie-parser";

import { LoginDocument, LogoutDocument } from "~/data/graphql-documents";
import { serverEnv } from "~/lib/env";
import { serverGraphQLRequest } from "~/lib/server-graphql-client";

type VendureUser = User & {
  identifier: string;
  vendureAuthToken?: string;
};

const nodeEnv = process.env.NODE_ENV ?? "development";

const loginMutation = async (email: string, password: string) => {
  const response = await fetch(serverEnv.VENDURE_SHOP_API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: print(LoginDocument),
      variables: {
        email,
        password,
        rememberMe: true,
      },
    }),
    cache: "no-store",
  });

  const payload = await response.json();

  if (payload.errors?.length) {
    throw new Error(payload.errors[0].message ?? "Unable to login");
  }

  const result = payload.data?.login;

  if (!result || result.__typename !== "CurrentUser") {
    const message =
      result?.message ?? "Unable to login with the provided credentials";
    throw new Error(message);
  }

  const headerValue = response.headers.get("set-cookie");
  const rawCookies =
    (
      response.headers as Headers & { getSetCookie?: () => string[] }
    ).getSetCookie?.() ?? (headerValue ? [headerValue] : []);

  const parsedList = setCookieParser.parse(rawCookies);
  const matchedCookie = parsedList.find(
    (cookie) => cookie.name === serverEnv.VENDURE_AUTH_TOKEN_NAME
  );
  const vendureCookie = matchedCookie ?? parsedList[0];

  let vendureToken = vendureCookie?.value;
  if (!vendureToken) {
    vendureToken = response.headers.get("vendure-auth-token") ?? undefined;
  }

  if (!vendureToken) {
    throw new Error("Authentication token not received from Vendure");
  }

  const cookieStore = await cookies();
  const writeCookie = (name: string) =>
    cookieStore.set({
      name,
      value: vendureToken!,
      httpOnly: true,
      sameSite: "lax",
      secure: nodeEnv === "production",
      path: vendureCookie?.path ?? "/",
      expires: vendureCookie?.expires,
      maxAge: vendureCookie?.maxAge ?? 60 * 60 * 24 * 30,
    });

  if (vendureCookie?.name) {
    writeCookie(vendureCookie.name);
  }
  writeCookie(serverEnv.VENDURE_AUTH_TOKEN_NAME);

  return {
    id: result.id,
    identifier: result.identifier,
    vendureAuthToken: vendureToken,
  };
};

const clearVendureCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: serverEnv.VENDURE_AUTH_TOKEN_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: nodeEnv === "production",
    path: "/",
    maxAge: 0,
  });
};

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Vendure credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        const user = await loginMutation(
          credentials.email,
          credentials.password
        );

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const vendureUser = user as VendureUser;
        token.sub = vendureUser.id;
        token.email = vendureUser.identifier;
        token.vendureAuthToken = vendureUser.vendureAuthToken;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      if (session.user && token.email) {
        session.user.email = token.email;
      }

      if (token.vendureAuthToken) {
        (
          session as typeof session & {
            vendureAuthToken?: string;
          }
        ).vendureAuthToken = token.vendureAuthToken as string;
      }

      return session;
    },
  },
  events: {
    async signOut() {
      try {
        await serverGraphQLRequest(LogoutDocument);
      } catch (error) {
        console.error("Failed to logout from Vendure", error);
      } finally {
        clearVendureCookie();
      }
    },
  },
};
