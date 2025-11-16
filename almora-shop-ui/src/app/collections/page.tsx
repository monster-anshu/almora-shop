import Link from "next/link";

import { CategoryRail } from "~/components/home/category-rail";
import { CollectionsForHomeDocument } from "~/data/graphql-documents";
import { serverGraphQLRequest } from "~/lib/server-graphql-client";

const CollectionsPage = async () => {
  const data = await serverGraphQLRequest(CollectionsForHomeDocument, {
    take: 20,
  });

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
      <div>
        <h1 className="text-3xl font-semibold">Browse collections</h1>
        <p className="text-muted-foreground">
          Curated categories from your nearby quick-commerce hub.
        </p>
      </div>
      <CategoryRail collections={data.collections.items} />
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {data.collections.items.map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.slug}`}
            className="border-border/60 bg-card hover:border-primary rounded-3xl border p-4 transition"
          >
            <p className="font-semibold">{collection.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CollectionsPage;
