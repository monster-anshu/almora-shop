declare module "next-auth" {
  interface Session {
    vendureAuthToken?: string;
  }

  interface User {
    identifier?: string;
    vendureAuthToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    vendureAuthToken?: string;
  }
}
