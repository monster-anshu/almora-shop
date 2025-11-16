import Image from "next/image";

import type { ProductDetailQuery } from "~/gql/graphql";

type ProductGalleryProps = {
  product: NonNullable<ProductDetailQuery["product"]>;
};

export const ProductGallery = ({ product }: ProductGalleryProps) => {
  const images = product.assets?.length
    ? product.assets
    : product.featuredAsset
      ? [product.featuredAsset]
      : [];

  if (!images.length) {
    return (
      <div className="border-border/60 text-muted-foreground flex h-96 items-center justify-center rounded-3xl border border-dashed">
        No image available
      </div>
    );
  }

  const [primary, ...thumbnails] = images;

  return (
    <div className="space-y-4">
      <div className="border-border/60 overflow-hidden rounded-3xl border">
        <Image
          src={primary.preview}
          alt={product.name}
          width={800}
          height={600}
          className="h-96 w-full object-cover"
        />
      </div>
      {thumbnails.length > 0 && (
        <div className="flex gap-3">
          {thumbnails.map((asset) => (
            <Image
              key={asset.id}
              src={asset.preview}
              alt={product.name}
              width={120}
              height={120}
              className="h-20 w-20 rounded-2xl object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
};
