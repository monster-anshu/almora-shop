import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductGrid } from "~/components/product/product-grid";
import { Button } from "~/components/ui/button";
import { CollectionDetailDocument } from "~/data/graphql-documents";
import type { FeaturedProductsQuery } from "~/gql/graphql";
import { serverGraphQLRequest } from "~/lib/server-graphql-client";

type CollectionPageProps = {
  params: { slug: string };
  searchParams: { page?: string };
};

const PAGE_SIZE = 12;

const CollectionPage = async ({
  params,
  searchParams,
}: CollectionPageProps) => {
  const page = Number(searchParams.page ?? "1");
  const skip = (page - 1) * PAGE_SIZE;

  const data = await serverGraphQLRequest(CollectionDetailDocument, {
    slug: params.slug,
    options: {
      take: PAGE_SIZE,
      skip,
    },
  });

  if (!data.collection) {
    notFound();
  }

  const variants = data.collection.productVariants.items;
  const normalizedProducts = variants.map((variant) => ({
    id: variant.product.id,
    name: variant.product.name,
    slug: variant.product.slug,
    description: variant.product.description ?? "",
    featuredAsset: variant.product.featuredAsset,
    variants: [
      {
        id: variant.id,
        sku: variant.sku,
        priceWithTax: variant.priceWithTax,
        currencyCode: variant.currencyCode,
      },
    ],
  })) as FeaturedProductsQuery["products"]["items"];

  const totalItems = data.collection.productVariants.totalItems;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8">
      <div className="border-border/60 bg-card rounded-3xl border p-6">
        <p className="text-muted-foreground text-sm">Collection</p>
        <h1 className="text-3xl font-semibold">{data.collection.name}</h1>
        {data.collection.description && (
          <p className="text-muted-foreground mt-2">
            {data.collection.description}
          </p>
        )}
      </div>

      <ProductGrid products={normalizedProducts} />

      {totalPages > 1 && (
        <div className="border-border/60 bg-card flex items-center justify-between rounded-2xl border px-4 py-3">
          <Button variant="outline" size="sm" asChild disabled={page <= 1}>
            <Link href={`/collections/${params.slug}?page=${page - 1}`}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Link>
          </Button>
          <p className="text-muted-foreground text-sm">
            Page {page} of {totalPages}
          </p>
          <Button
            variant="outline"
            size="sm"
            asChild
            disabled={page >= totalPages}
          >
            <Link href={`/collections/${params.slug}?page=${page + 1}`}>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default CollectionPage;
