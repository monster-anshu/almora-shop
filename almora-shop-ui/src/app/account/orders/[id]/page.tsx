import Link from "next/link";
import { notFound } from "next/navigation";

import { OrderTimeline } from "~/components/orders/order-timeline";
import { OrderDetailDocument } from "~/data/graphql-documents";
import { formatCurrency } from "~/lib/money";
import { serverGraphQLRequest } from "~/lib/server-graphql-client";

type OrderDetailPageProps = {
  params: { id: string };
};

const OrderDetailPage = async ({ params }: OrderDetailPageProps) => {
  const data = await serverGraphQLRequest(OrderDetailDocument, {
    id: params.id,
  });

  if (!data.order) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Link href="/account/orders" className="text-muted-foreground text-sm">
        ← Back to orders
      </Link>
      <div className="grid gap-6 lg:grid-cols-[1.5fr,1fr]">
        <div className="space-y-4">
          {data.order.lines.map((line) => (
            <div
              key={line.id}
              className="border-border/60 bg-card rounded-3xl border p-4"
            >
              <p className="font-semibold">{line.productVariant.name}</p>
              <p className="text-muted-foreground text-sm">
                {line.quantity} ×{" "}
                {formatCurrency(
                  line.unitPriceWithTax,
                  data.order?.currencyCode ?? "INR"
                )}
              </p>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <OrderTimeline order={data.order} />
          <div className="border-border/60 bg-card rounded-3xl border p-6">
            <h2 className="mb-2 text-lg font-semibold">Delivery address</h2>
            <p className="text-muted-foreground text-sm">
              {data.order.shippingAddress?.fullName}
              <br />
              {data.order.shippingAddress?.streetLine1}
              {data.order.shippingAddress?.streetLine2
                ? `, ${data.order.shippingAddress.streetLine2}`
                : ""}
              <br />
              {data.order.shippingAddress?.city} ·{" "}
              {data.order.shippingAddress?.postalCode}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
