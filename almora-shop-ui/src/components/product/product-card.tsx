"use client";

import { Loader2, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import type { FeaturedProductsQuery } from "~/gql/graphql";
import { useAddToCart } from "~/hooks/use-cart";
import { formatCurrency } from "~/lib/money";
import { cn } from "~/lib/utils";

type Product = FeaturedProductsQuery["products"]["items"][number];

type ProductCardProps = {
  product: Product;
  variantId?: string;
};

export const ProductCard = ({ product, variantId }: ProductCardProps) => {
  const primaryVariant = product.variants?.[0];
  const selectedVariantId = variantId ?? primaryVariant?.id;
  const { mutateAsync, isPending } = useAddToCart();

  const handleAddToCart = async () => {
    if (!selectedVariantId) return;
    await mutateAsync({ productVariantId: selectedVariantId, quantity: 1 });
  };

  return (
    <div className="border-border/50 flex h-full min-w-[220px] flex-col rounded-[28px] border bg-white/90 p-3 shadow-[0_10px_25px_rgba(255,154,68,0.12)] sm:min-w-0">
      <Link
        href={`/product/${product.slug}`}
        className="relative mb-3 block overflow-hidden rounded-2xl"
      >
        {product.featuredAsset?.preview ? (
          <Image
            src={product.featuredAsset.preview}
            alt={product.name}
            width={320}
            height={240}
            className="h-48 w-full object-cover transition-transform hover:scale-105"
          />
        ) : (
          <div className="bg-muted text-muted-foreground flex h-48 items-center justify-center">
            {product.name}
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2">
        <Link
          href={`/product/${product.slug}`}
          className="text-foreground text-base leading-tight font-semibold"
        >
          {product.name}
        </Link>
        <p className="text-muted-foreground line-clamp-2 text-sm">
          {product.description}
        </p>
        {primaryVariant && (
          <p className="text-primary text-lg font-semibold">
            {formatCurrency(
              primaryVariant.priceWithTax,
              primaryVariant.currencyCode
            )}
          </p>
        )}
        <div className="mt-auto">
          <Button
            className={cn(
              "from-primary text-primary-foreground w-full rounded-2xl bg-gradient-to-r to-[#ff6a88]"
            )}
            onClick={handleAddToCart}
            disabled={!selectedVariantId || isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" /> Add to cart
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
