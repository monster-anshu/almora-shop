import Link from "next/link";
import { redirect } from "next/navigation";

import { RegisterForm } from "~/components/auth/register-form";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { getServerAuthSession } from "~/lib/auth/session";

const RegisterPage = async () => {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/account/orders");
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-12">
      <Card className="border-border/60 rounded-3xl border shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Join Almora Shop
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <RegisterForm />
          <p className="text-muted-foreground text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
