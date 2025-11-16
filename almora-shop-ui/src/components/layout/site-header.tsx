import { Bike, Clock, MapPin, Search } from "lucide-react";
import Link from "next/link";

import { CartButton } from "~/components/cart/cart-button";
import { Input } from "~/components/ui/input";
import { getServerAuthSession } from "~/lib/auth/session";
import { cn } from "~/lib/utils";

const metaItems = [
  { icon: MapPin, label: "Delivering to", value: "Almora CBD" },
  { icon: Clock, label: "ETA", value: "20 mins" },
  { icon: Bike, label: "Mode", value: "2-Wheeler" },
];

export const SiteHeader = async () => {
  const session = await getServerAuthSession();

  return (
    <header className="border-border/30 bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            Almora <span className="text-primary">Shop</span>
          </Link>
          <div className="flex items-center gap-3 md:hidden">
            {session ? (
              <Link
                href="/account/orders"
                className="text-muted-foreground text-sm font-medium"
              >
                Hi, {session.user?.email?.split("@")[0]}
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-muted-foreground text-sm font-medium"
              >
                Login
              </Link>
            )}
            <CartButton />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 rounded-[28px] border border-white/70 bg-white/80 p-4 shadow-sm md:flex-row md:items-center">
          <div className="text-muted-foreground grid flex-1 grid-cols-1 gap-3 text-sm sm:grid-cols-2 md:grid-cols-3">
            {metaItems.map((item, index) => (
              <div
                key={item.label}
                className={cn(
                  "border-border/40 flex items-center gap-3 rounded-2xl border bg-white px-3 py-2",
                  index < metaItems.length - 1 &&
                    "border-border/60 border-b pb-2 md:border-r md:border-b-0 md:pr-4 md:pb-0"
                )}
              >
                <item.icon className="text-primary h-4 w-4" />
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs tracking-wide uppercase">
                    {item.label}
                  </span>
                  <span className="text-foreground font-medium">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-border/70 flex items-center gap-3 rounded-2xl border bg-white px-4 py-2 shadow-inner">
            <Search className="text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search for fruits, snacks, dairy..."
              className="border-0 p-0 text-sm shadow-none focus-visible:ring-0"
            />
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {session ? (
            <>
              <Link
                href="/account/orders"
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                Orders
              </Link>
              <Link
                href="/account/profile"
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                Profile
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              Login
            </Link>
          )}
          <CartButton />
        </div>
      </div>
    </header>
  );
};
