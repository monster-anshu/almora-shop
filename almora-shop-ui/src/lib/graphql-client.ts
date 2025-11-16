import { GraphQLClient } from "graphql-request";

import { publicEnv } from "./public-env";

const browserFetch: typeof fetch = (input, init) =>
  fetch(input, {
    ...init,
    credentials: "include",
  });

export const browserGraphQLClient = new GraphQLClient(
  publicEnv.NEXT_PUBLIC_VENDURE_SHOP_API_URL,
  {
    fetch: browserFetch,
  }
);
