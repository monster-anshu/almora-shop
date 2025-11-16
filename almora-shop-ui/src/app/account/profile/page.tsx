import { redirect } from "next/navigation";

import { AddressList } from "~/components/account/address-list";
import { ProfileForm } from "~/components/account/profile-form";
import { SignOutButton } from "~/components/account/sign-out-button";
import { ActiveCustomerDocument } from "~/data/graphql-documents";
import { serverGraphQLRequest } from "~/lib/server-graphql-client";

const ProfilePage = async () => {
  const data = await serverGraphQLRequest(ActiveCustomerDocument);
  if (!data.activeCustomer) {
    redirect("/login");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
      <div className="border-border/60 bg-card space-y-4 rounded-3xl border p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Profile details</h2>
          <SignOutButton />
        </div>
        <ProfileForm customer={data.activeCustomer} />
      </div>
      <div className="border-border/60 bg-card rounded-3xl border p-6">
        <h2 className="mb-4 text-lg font-semibold">Saved addresses</h2>
        <AddressList addresses={data.activeCustomer.addresses ?? []} />
      </div>
    </div>
  );
};

export default ProfilePage;
