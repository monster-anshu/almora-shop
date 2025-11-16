import Link from "next/link";

const footerLinks = [
  { label: "About", href: "#" },
  { label: "Help & Support", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Contact", href: "#" },
];

export const SiteFooter = () => {
  return (
    <footer className="border-border/60 bg-muted/30 border-t py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold">Almora Shop</p>
          <p className="text-muted-foreground text-sm">
            Lightning-fast delivery sourced from nearby partner stores.
          </p>
        </div>
        <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
