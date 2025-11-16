import Image from "next/image";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import type { CollectionsForHomeQuery } from "~/gql/graphql";

type HeroProps = {
  collections: CollectionsForHomeQuery["collections"]["items"];
};

export const Hero = ({ collections }: HeroProps) => {
  const primaryCollection = collections[0];
  const fallbackLink = primaryCollection
    ? `/collections/${primaryCollection.slug}`
    : "/collections";

  return (
    <section className="overflow-hidden rounded-[32px] bg-gradient-to-br from-[#fff1df] via-[#ffd9f0] to-[#fff0e5] shadow-[0_25px_40px_rgba(255,122,24,0.18)]">
      <div className="flex flex-col gap-8 px-5 py-10 md:grid md:grid-cols-2 md:px-10">
        <div className="space-y-6">
          <div className="text-primary inline-flex flex-wrap items-center gap-2 rounded-full bg-white/70 px-4 py-1 text-xs font-semibold shadow-sm">
            <span>⚡ Instant delivery</span>
            <span className="text-muted-foreground">• Blinkit-style UI</span>
          </div>
          <h1 className="text-foreground text-3xl leading-tight font-semibold sm:text-4xl">
            Urban essentials in{" "}
            <span className="from-primary bg-gradient-to-r to-[#ff6a88] bg-clip-text text-transparent">
              under 20 mins
            </span>
          </h1>
          <p className="text-muted-foreground text-base">
            Lightning-fast groceries, snacks, and daily needs from nearby
            partner stores. Optimized for mobile webview with real-time order
            tracking.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-2xl px-6">
              <Link href={fallbackLink}>Start ordering</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-2xl">
              <Link href="/account/orders">Track orders</Link>
            </Button>
          </div>
          <div className="text-muted-foreground grid grid-cols-3 gap-3 rounded-3xl bg-white/70 p-4 text-center text-xs font-medium shadow-inner sm:text-sm">
            <div>
              <p className="text-foreground text-lg font-semibold">1500+</p>
              <p>Products</p>
            </div>
            <div>
              <p className="text-foreground text-lg font-semibold">99%</p>
              <p>On-time</p>
            </div>
            <div>
              <p className="text-foreground text-lg font-semibold">4.9/5</p>
              <p>Ratings</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible [&::-webkit-scrollbar]:hidden">
          {collections.slice(0, 4).map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="group relative flex min-w-[180px] flex-col overflow-hidden rounded-3xl border border-white/60 bg-white shadow-md transition hover:-translate-y-1"
            >
              {collection.featuredAsset?.preview ? (
                <Image
                  src={collection.featuredAsset.preview}
                  alt={collection.name}
                  width={240}
                  height={240}
                  className="h-40 w-full object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="from-primary/20 to-secondary/30 text-primary flex h-40 items-center justify-center bg-gradient-to-br text-sm font-semibold">
                  {collection.name}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70" />
              <div className="absolute bottom-3 left-3 text-white">
                <p className="text-sm font-semibold">{collection.name}</p>
                <p className="text-xs text-white/80">Explore →</p>
              </div>
            </Link>
          ))}
          {collections.length === 0 && (
            <div className="border-border/70 text-muted-foreground flex min-h-[160px] min-w-[180px] items-center justify-center rounded-3xl border border-dashed bg-white/70 text-sm">
              Add featured collections to showcase here
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
