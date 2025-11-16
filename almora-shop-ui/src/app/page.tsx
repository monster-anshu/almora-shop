import { CategoryRail } from "~/components/home/category-rail";
import { Hero } from "~/components/home/hero";
import { ProductGrid } from "~/components/product/product-grid";
import {
  CollectionsForHomeDocument,
  FeaturedProductsDocument,
} from "~/data/graphql-documents";
import { serverGraphQLRequest } from "~/lib/server-graphql-client";

const HomePage = async () => {
  const [collectionsResponse, featuredProductsResponse] = await Promise.all([
    serverGraphQLRequest(CollectionsForHomeDocument),
    serverGraphQLRequest(FeaturedProductsDocument, { take: 12 }),
  ]);

  const collections = collectionsResponse.collections.items;
  const products = featuredProductsResponse.products.items;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8">
      <Hero collections={collections} />
      <CategoryRail collections={collections} />
      <ProductGrid products={products} />
    </div>
  );
};

export default HomePage;
