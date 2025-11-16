"use client";

import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import type { ProductDetailQuery } from "~/gql/graphql";
import { useAddToCart } from "~/hooks/use-cart";
import { formatCurrency } from "~/lib/money";

type ProductPurchaseCardProps = {
  product: NonNullable<ProductDetailQuery["product"]>;
};

export const ProductPurchaseCard = ({ product }: ProductPurchaseCardProps) => {
  const [variantId, setVariantId] = useState(product.variants?.[0]?.id ?? "");
  const { mutateAsync, isPending } = useAddToCart();

  const variant = useMemo(
    () => product.variants?.find((item) => item.id === variantId),
    [product.variants, variantId]
  );

  const price = variant
    ? formatCurrency(variant.priceWithTax, variant.currencyCode)
    : null;

  const handleAddToCart = async () => {
    if (!variant) return;
    await mutateAsync({ productVariantId: variant.id, quantity: 1 });
  };

  return (
    <div className="border-border/60 bg-card space-y-4 rounded-3xl border p-6 shadow-sm">
      <div>
        <p className="text-muted-foreground text-sm">Price</p>
        <p className="text-3xl font-semibold">{price ?? "N/A"}</p>
      </div>

      {product.variants && product.variants.length > 1 && (
        <div className="space-y-2">
          <Label htmlFor="variant">Choose pack size</Label>
          <select
            id="variant"
            className="border-border/80 w-full rounded-2xl border bg-transparent px-4 py-2 text-sm"
            value={variantId}
            onChange={(event) => setVariantId(event.target.value)}
          >
            {product.variants?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} •{" "}
                {formatCurrency(item.priceWithTax, item.currencyCode)}
              </option>
            ))}
          </select>
        </div>
      )}

      <Button
        className="w-full rounded-2xl"
        disabled={!variant || isPending}
        onClick={handleAddToCart}
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding
          </>
        ) : (
          "Add to cart"
        )}
      </Button>
      <p className="text-muted-foreground text-xs">
        Cash on delivery · Free returns · Delivery partner assigned instantly
      </p>
    </div>
  );
};
