import { redirect } from "next/navigation";

import { CheckoutForm } from "~/components/checkout/checkout-form";
import { CountriesDocument } from "~/data/graphql-documents";
import { getServerAuthSession } from "~/lib/auth/session";
import { serverGraphQLRequest } from "~/lib/server-graphql-client";

const CheckoutPage = async () => {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/login?callbackUrl=/checkout");
  }

  const countriesResponse = await serverGraphQLRequest(CountriesDocument);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8">
      <div>
        <p className="text-muted-foreground text-sm">Delivery</p>
        <h1 className="text-3xl font-semibold">Checkout</h1>
      </div>
      <CheckoutForm countries={countriesResponse.availableCountries} />
    </div>
  );
};

export default CheckoutPage;
