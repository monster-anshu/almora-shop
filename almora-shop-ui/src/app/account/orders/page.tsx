import Link from "next/link";
import { notFound } from "next/navigation";

import { OrdersListDocument } from "~/data/graphql-documents";
import { formatCurrency } from "~/lib/money";
import { getOrderStatusMeta } from "~/lib/order-status";
import { serverGraphQLRequest } from "~/lib/server-graphql-client";

type OrdersPageProps = {
  searchParams: Promise<{ page?: string }>;
};

const PAGE_SIZE = 10;

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const params = await searchParams;
  const page = Number(params?.page ?? "1");
  const skip = (page - 1) * PAGE_SIZE;

  const data = await serverGraphQLRequest(OrdersListDocument, {
    options: { take: PAGE_SIZE, skip },
  });

  if (!data.activeCustomer) {
    notFound();
  }

  const orders = data.activeCustomer.orders.items;

  return (
    <div className="space-y-4">
      {orders.length === 0 && (
        <div className="border-border/60 bg-card rounded-3xl border p-10 text-center">
          <p className="text-lg font-semibold">No orders yet</p>
          <p className="text-muted-foreground text-sm">
            Start an order from the home page to see the timeline here.
          </p>
        </div>
      )}

      {orders.map((order) => {
        const status = getOrderStatusMeta(order.state);
        return (
          <div
            key={order.id}
            className="border-border/60 bg-card flex flex-col gap-4 rounded-3xl border p-6 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="text-muted-foreground text-sm">
                Order #{order.code}
              </p>
              <p className="text-lg font-semibold">{status.label}</p>
              <p className="text-muted-foreground text-sm">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="text-muted-foreground text-sm">
              <p>
                {order.totalQuantity} items ·{" "}
                {formatCurrency(order.totalWithTax, order.currencyCode)}
              </p>
            </div>
            <Link
              href={`/account/orders/${order.id}`}
              className="text-primary text-sm font-semibold"
            >
              View details →
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default OrdersPage;
