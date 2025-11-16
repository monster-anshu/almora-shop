import * as React from "react";

import { cn } from "~/lib/utils";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, decorative = true, role = "separator", ...props }, ref) => (
    <div
      ref={ref}
      role={role}
      aria-orientation="horizontal"
      aria-hidden={decorative ? true : undefined}
      className={cn("bg-border h-px w-full", className)}
      {...props}
    />
  )
);
Separator.displayName = "Separator";

export { Separator };
