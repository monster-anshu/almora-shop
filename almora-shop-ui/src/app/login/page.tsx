import Link from "next/link";
import { redirect } from "next/navigation";

import { LoginForm } from "~/components/auth/login-form";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { getServerAuthSession } from "~/lib/auth/session";

const LoginPage = async () => {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/account/orders");
  }

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 py-12">
      <Card className="border-border/60 rounded-3xl border shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Welcome back</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <LoginForm />
          <p className="text-muted-foreground text-center text-sm">
            New to Almora Shop?{" "}
            <Link href="/register" className="text-primary underline">
              Create an account
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
