import type { ActiveCustomerDocument } from "~/data/graphql-documents";

type Customer = NonNullable<ActiveCustomerDocument["activeCustomer"]>;

type AddressListProps = {
  addresses?: Customer["addresses"];
};

export const AddressList = ({ addresses }: AddressListProps) => {
  if (!addresses || addresses.length === 0) {
    return (
      <div className="border-border/80 bg-card text-muted-foreground rounded-3xl border border-dashed p-6 text-center text-sm">
        No addresses saved yet. Add one during checkout and it will appear here.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {addresses.map((address) => (
        <div
          key={address?.id}
          className="border-border/80 bg-card rounded-3xl border p-4"
        >
          <p className="font-semibold">{address?.fullName}</p>
          <p className="text-muted-foreground text-sm">
            {address?.streetLine1}
            {address?.streetLine2 ? `, ${address.streetLine2}` : ""}
          </p>
          <p className="text-muted-foreground text-sm">
            {address?.city} · {address?.postalCode}
          </p>
          <p className="text-muted-foreground text-sm">
            {address?.country?.name}
          </p>
        </div>
      ))}
    </div>
  );
};
