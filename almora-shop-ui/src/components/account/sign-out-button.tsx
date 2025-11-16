"use client";

import { signOut } from "next-auth/react";

import { Button } from "~/components/ui/button";

export const SignOutButton = () => {
  return (
    <Button
      variant="outline"
      className="rounded-2xl"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Sign out
    </Button>
  );
};
