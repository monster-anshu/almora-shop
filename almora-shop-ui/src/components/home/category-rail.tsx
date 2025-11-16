import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { CollectionsForHomeQuery } from "~/gql/graphql";

type CategoryRailProps = {
  collections: CollectionsForHomeQuery["collections"]["items"];
};

export const CategoryRail = ({ collections }: CategoryRailProps) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Shop by category</h2>
        <Link
          href="/collections"
          className="text-primary inline-flex items-center text-sm font-medium"
        >
          View all <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      {collections.length === 0 ? (
        <div className="border-border/70 bg-muted/60 text-muted-foreground rounded-2xl border border-dashed px-4 py-6 text-sm">
          Collections not found yet. Add top-level collections in Vendure to
          highlight them here.
        </div>
      ) : (
        <div className="flex snap-x gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="group border-border/60 bg-card relative flex min-w-[160px] snap-center flex-col overflow-hidden rounded-3xl border shadow-sm transition hover:-translate-y-1"
            >
              {collection.featuredAsset?.preview ? (
                <Image
                  src={collection.featuredAsset.preview}
                  alt={collection.name}
                  width={180}
                  height={120}
                  className="h-24 w-full object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="from-primary/10 to-secondary/40 text-primary flex h-24 items-center justify-center bg-gradient-to-br text-sm font-medium">
                  {collection.name}
                </div>
              )}
              <div className="p-3">
                <p className="font-medium">{collection.name}</p>
                <p className="text-muted-foreground text-xs">Tap to explore</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};
