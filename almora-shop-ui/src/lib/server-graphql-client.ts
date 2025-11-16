import "server-only";

import {
  GraphQLClient,
  type RequestDocument,
  type Variables,
} from "graphql-request";
import { cookies } from "next/headers";

import { serverEnv } from "./env";

type RequestOptions = {
  headers?: HeadersInit;
  cache?: RequestCache;
};

export async function serverGraphQLRequest<TData, TVariables extends Variables>(
  document: RequestDocument,
  variables?: TVariables,
  options?: RequestOptions
): Promise<TData> {
  const cookieStore = await cookies();
  const vendureSession = cookieStore.get(
    serverEnv.VENDURE_AUTH_TOKEN_NAME
  )?.value;

  const headers = new Headers(options?.headers);

  if (vendureSession) {
    headers.set(
      "cookie",
      `${serverEnv.VENDURE_AUTH_TOKEN_NAME}=${vendureSession}`
    );
  }

  const client = new GraphQLClient(serverEnv.VENDURE_SHOP_API_URL, {
    headers,
    fetch: (input, init) =>
      fetch(input, {
        ...init,
        cache: options?.cache ?? "no-store",
        next: { revalidate: 0 },
      }),
  });

  return client.request<TData, TVariables>(document, variables);
}
