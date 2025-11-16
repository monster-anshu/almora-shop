"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import type { ActiveOrderFieldsFragment } from "~/gql/graphql";
import {
  useActiveOrderQuery,
  useRemoveCartLine,
  useUpdateCartLine,
} from "~/hooks/use-cart";
import { formatCurrency } from "~/lib/money";

const QuantityButton = ({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className="border-border/80 bg-background text-foreground flex h-8 w-8 items-center justify-center rounded-full border disabled:opacity-50"
  >
    {children}
  </button>
);

const CartLineItem = ({
  line,
}: {
  line: ActiveOrderFieldsFragment["lines"][number];
}) => {
  const { mutateAsync: updateLine, isPending } = useUpdateCartLine();
  const { mutateAsync: removeLine, isPending: isRemoving } =
    useRemoveCartLine();

  const handleIncrease = () =>
    updateLine({ orderLineId: line.id, quantity: line.quantity + 1 });
  const handleDecrease = () => {
    if (line.quantity === 1) {
      removeLine({ orderLineId: line.id });
      return;
    }
    updateLine({ orderLineId: line.id, quantity: line.quantity - 1 });
  };

  const featuredImage =
    line.featuredAsset?.preview ??
    line.productVariant.product.featuredAsset?.preview;

  const price = formatCurrency(
    line.discountedLinePriceWithTax ?? line.linePriceWithTax,
    line.productVariant.currencyCode
  );

  return (
    <div className="border-border/60 bg-card flex flex-col gap-4 rounded-3xl border p-4 md:flex-row md:items-center">
      {featuredImage ? (
        <Image
          src={featuredImage}
          alt={line.productVariant.name}
          width={120}
          height={120}
          className="h-24 w-24 rounded-2xl object-cover"
        />
      ) : (
        <div className="bg-muted text-muted-foreground flex h-24 w-24 items-center justify-center rounded-2xl">
          {line.productVariant.name}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2">
        <Link
          href={`/product/${line.productVariant.product.slug}`}
          className="text-base font-semibold"
        >
          {line.productVariant.name}
        </Link>
        <p className="text-muted-foreground text-sm">
          SKU: {line.productVariant.sku}
        </p>
        <p className="font-semibold">{price}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <QuantityButton
            onClick={handleDecrease}
            disabled={isPending || isRemoving}
          >
            <Minus className="h-4 w-4" />
          </QuantityButton>
          <span className="w-6 text-center font-medium">{line.quantity}</span>
          <QuantityButton onClick={handleIncrease} disabled={isPending}>
            <Plus className="h-4 w-4" />
          </QuantityButton>
        </div>
        <button
          type="button"
          className="border-border/80 text-muted-foreground hover:text-destructive rounded-full border p-2"
          onClick={() => removeLine({ orderLineId: line.id })}
          disabled={isRemoving}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const CartSummary = ({ order }: { order: ActiveOrderFieldsFragment }) => {
  const currency = order.currencyCode;
  return (
    <div className="border-border/60 bg-card space-y-4 rounded-3xl border p-6">
      <h2 className="text-lg font-semibold">Order summary</h2>
      <div className="space-y-2 text-sm">
        <div className="text-muted-foreground flex justify-between">
          <span>Items</span>
          <span>{formatCurrency(order.subTotalWithTax, currency)}</span>
        </div>
        <div className="text-muted-foreground flex justify-between">
          <span>Delivery</span>
          <span>{formatCurrency(order.shippingWithTax, currency)}</span>
        </div>
        <div className="flex justify-between text-base font-semibold">
          <span>Total</span>
          <span>{formatCurrency(order.totalWithTax, currency)}</span>
        </div>
      </div>
      <Button asChild className="w-full rounded-2xl">
        <Link href="/checkout">Go to checkout</Link>
      </Button>
    </div>
  );
};

export const CartContent = () => {
  const { data: order, isLoading } = useActiveOrderQuery();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="bg-muted h-24 w-full animate-pulse rounded-3xl" />
        <div className="bg-muted h-24 w-full animate-pulse rounded-3xl" />
      </div>
    );
  }

  if (!order || order.lines.length === 0) {
    return (
      <div className="border-border/60 bg-card rounded-3xl border p-12 text-center">
        <p className="text-lg font-semibold">Your cart is empty</p>
        <p className="text-muted-foreground text-sm">
          Browse categories and add items to get started.
        </p>
        <Button asChild className="mt-4 rounded-2xl">
          <Link href="/">Continue shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
      <div className="space-y-4">
        {order.lines.map((line) => (
          <CartLineItem key={line.id} line={line} />
        ))}
      </div>
      <CartSummary order={order} />
    </div>
  );
};
