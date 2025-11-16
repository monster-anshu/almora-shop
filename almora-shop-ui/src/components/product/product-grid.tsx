import { ProductCard } from "~/components/product/product-card";
import type { FeaturedProductsQuery } from "~/gql/graphql";

type ProductGridProps = {
  products: FeaturedProductsQuery["products"]["items"];
};

export const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Popular near you</h2>
          <p className="text-muted-foreground text-sm">
            Quick reorder from frequently purchased products
          </p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
