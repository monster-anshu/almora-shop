"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import { useActiveOrderQuery } from "~/hooks/use-cart";

export const CartButton = () => {
  const { data: order, isFetching } = useActiveOrderQuery();
  const quantity = order?.totalQuantity ?? 0;

  return (
    <Button asChild variant="secondary" size="sm" className="relative">
      <Link href="/cart" aria-live="polite" aria-busy={isFetching}>
        <ShoppingCart className="h-4 w-4" />
        <span className="ml-2 hidden md:inline">Cart</span>
        {quantity > 0 && (
          <span className="bg-primary text-primary-foreground ml-2 rounded-full px-2 py-0.5 text-xs font-semibold">
            {quantity}
          </span>
        )}
      </Link>
    </Button>
  );
};
