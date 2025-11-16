import type { OrderDetailQuery } from "~/data/graphql-documents";
import { getOrderStatusMeta, ORDER_STATUS_STEPS } from "~/lib/order-status";

type OrderTimelineProps = {
  order: NonNullable<OrderDetailQuery["order"]>;
};

export const OrderTimeline = ({ order }: OrderTimelineProps) => {
  const current = getOrderStatusMeta(order.state);

  return (
    <div className="border-border/60 bg-card rounded-3xl border p-6">
      <h2 className="mb-4 text-lg font-semibold">Delivery status</h2>
      <div className="space-y-4">
        {ORDER_STATUS_STEPS.map((step) => {
          const isActive = current.step === step.step;
          const isCompleted = current.step > step.step;

          return (
            <div key={step.step} className="flex items-start gap-4">
              <div
                className={`mt-1 h-3 w-3 rounded-full ${
                  isCompleted
                    ? "bg-primary"
                    : isActive
                      ? "bg-primary/70"
                      : "bg-muted"
                }`}
              />
              <div>
                <p className="font-medium">{step.label}</p>
                {isActive && (
                  <p className="text-muted-foreground text-sm">
                    {current.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
