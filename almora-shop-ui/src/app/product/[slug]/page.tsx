import { notFound } from "next/navigation";

import { ProductGallery } from "~/components/product/product-gallery";
import { ProductGrid } from "~/components/product/product-grid";
import { ProductPurchaseCard } from "~/components/product/product-purchase-card";
import {
  FeaturedProductsDocument,
  ProductDetailDocument,
} from "~/data/graphql-documents";
import { serverGraphQLRequest } from "~/lib/server-graphql-client";

type ProductPageProps = {
  params: { slug: string };
};

const ProductPage = async ({ params }: ProductPageProps) => {
  const productResponse = await serverGraphQLRequest(ProductDetailDocument, {
    slug: params.slug,
  });

  if (!productResponse.product) {
    notFound();
  }

  const recommendations = await serverGraphQLRequest(FeaturedProductsDocument, {
    take: 6,
  });

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <ProductGallery product={productResponse.product} />
          <div className="border-border/60 bg-card rounded-3xl border p-6">
            <h1 className="text-3xl font-semibold">
              {productResponse.product.name}
            </h1>
            {productResponse.product.description && (
              <p className="text-muted-foreground mt-4">
                {productResponse.product.description}
              </p>
            )}
          </div>
        </div>
        <ProductPurchaseCard product={productResponse.product} />
      </div>

      {recommendations.products.items.length > 0 && (
        <div>
          <ProductGrid products={recommendations.products.items} />
        </div>
      )}
    </div>
  );
};

export default ProductPage;
