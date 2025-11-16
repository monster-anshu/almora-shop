"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { ActiveCustomerDocument } from "~/data/graphql-documents";
import { UpdateCustomerDocument } from "~/data/graphql-documents";
import { browserGraphQLClient } from "~/lib/graphql-client";

type Customer = NonNullable<ActiveCustomerDocument["activeCustomer"]>;

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phoneNumber: z.string().min(6).optional(),
});

type FormValues = z.infer<typeof schema>;

type ProfileFormProps = {
  customer: Customer;
};

export const ProfileForm = ({ customer }: ProfileFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: customer.firstName,
      lastName: customer.lastName,
      phoneNumber: customer.phoneNumber ?? "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await browserGraphQLClient.request(UpdateCustomerDocument, {
        input: {
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.phoneNumber,
        },
      });
      toast.success("Profile updated");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First name</Label>
          <Input id="firstName" {...register("firstName")} />
          {errors.firstName && (
            <p className="text-destructive text-sm">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input id="lastName" {...register("lastName")} />
          {errors.lastName && (
            <p className="text-destructive text-sm">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Email</Label>
        <Input value={customer.emailAddress} disabled />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone number</Label>
        <Input id="phoneNumber" {...register("phoneNumber")} />
        {errors.phoneNumber && (
          <p className="text-destructive text-sm">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="rounded-2xl">
        {isSubmitting ? "Saving..." : "Save changes"}
      </Button>
    </form>
  );
};
