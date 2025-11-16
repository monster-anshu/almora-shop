type StatusMeta = {
  label: string;
  description: string;
  step: number;
};

const STATUS_MAP: Record<string, StatusMeta> = {
  AddingItems: {
    label: "Order Planned",
    description: "Building your basket",
    step: 1,
  },
  ArrangingPayment: {
    label: "Preparing",
    description: "Packing from partner store",
    step: 2,
  },
  PaymentAuthorized: {
    label: "Preparing",
    description: "Awaiting final confirmation",
    step: 2,
  },
  PaymentSettled: {
    label: "Riding",
    description: "Rider picked up your order",
    step: 3,
  },
  Fulfilled: {
    label: "Delivered",
    description: "Order completed",
    step: 4,
  },
  PartiallyFulfilled: {
    label: "Partially delivered",
    description: "Check rider notes",
    step: 3,
  },
  Shipped: {
    label: "Out for delivery",
    description: "En-route to you",
    step: 3,
  },
  Cancelled: {
    label: "Cancelled",
    description: "This order was cancelled",
    step: 4,
  },
};

export const getOrderStatusMeta = (state: string): StatusMeta => {
  return (
    STATUS_MAP[state] ?? {
      label: state,
      description: "",
      step: 1,
    }
  );
};

export const ORDER_STATUS_STEPS = [
  { label: "Order Planned", step: 1 },
  { label: "Preparing", step: 2 },
  { label: "Riding", step: 3 },
  { label: "Delivered", step: 4 },
];
