"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import {
  AddPaymentToOrderDocument,
  EligiblePaymentMethodsDocument,
  EligibleShippingMethodsDocument,
  SetOrderShippingAddressDocument,
  SetOrderShippingMethodDocument,
} from "~/data/graphql-documents";
import { useActiveOrderQuery } from "~/hooks/use-cart";
import { browserGraphQLClient } from "~/lib/graphql-client";
import { formatCurrency } from "~/lib/money";

type CheckoutFormProps = {
  countries: {
    id: string;
    code: string;
    name: string;
  }[];
};

const schema = z.object({
  fullName: z.string().min(3),
  phoneNumber: z.string().min(8),
  streetLine1: z.string().min(3),
  streetLine2: z.string().optional(),
  city: z.string().min(2),
  postalCode: z.string().min(3),
  countryCode: z.string().min(2),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export const CheckoutForm = ({ countries }: CheckoutFormProps) => {
  const router = useRouter();
  const { data: order } = useActiveOrderQuery();
  const [shippingId, setShippingId] = useState<string | null>(null);
  const [paymentCode, setPaymentCode] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      countryCode: countries[0]?.code ?? "IN",
    },
  });

  const shippingQuery = useQuery({
    queryKey: ["eligible-shipping"],
    queryFn: async () => {
      const data = await browserGraphQLClient.request(
        EligibleShippingMethodsDocument
      );
      return data.eligibleShippingMethods;
    },
  });

  const paymentQuery = useQuery({
    queryKey: ["eligible-payment"],
    queryFn: async () => {
      const data = await browserGraphQLClient.request(
        EligiblePaymentMethodsDocument
      );
      return data.eligiblePaymentMethods;
    },
  });

  const { mutateAsync: submitCheckout } = useMutation({
    mutationFn: async (values: FormValues) => {
      const selectedShippingId =
        shippingId ?? shippingQuery.data?.[0]?.id ?? null;
      const selectedPaymentCode =
        paymentCode ??
        paymentQuery.data?.find((method) =>
          method.code.toLowerCase().includes("cod")
        )?.code ??
        paymentQuery.data?.[0]?.code ??
        null;

      if (!selectedShippingId || !selectedPaymentCode) {
        throw new Error("Select shipping and payment methods");
      }
      const shippingAddressResult = await browserGraphQLClient.request(
        SetOrderShippingAddressDocument,
        {
          input: {
            fullName: values.fullName,
            phoneNumber: values.phoneNumber,
            streetLine1: values.streetLine1,
            streetLine2: values.streetLine2,
            city: values.city,
            postalCode: values.postalCode,
            countryCode: values.countryCode,
          },
        }
      );

      if (
        shippingAddressResult.setOrderShippingAddress.__typename !== "Order"
      ) {
        throw new Error("Unable to set shipping address");
      }

      const shippingMethodResult = await browserGraphQLClient.request(
        SetOrderShippingMethodDocument,
        {
          shippingMethodIds: [selectedShippingId],
        }
      );

      if (shippingMethodResult.setOrderShippingMethod.__typename !== "Order") {
        throw new Error("Shipping method is not eligible");
      }

      const paymentResult = await browserGraphQLClient.request(
        AddPaymentToOrderDocument,
        {
          input: {
            method: selectedPaymentCode,
            metadata: {
              notes: values.notes ?? "",
              type: "cod",
            },
          },
        }
      );

      if (paymentResult.addPaymentToOrder.__typename !== "Order") {
        throw new Error("Payment could not be added");
      }
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await submitCheckout(values);
      toast.success("Order placed! View status in your timeline.");
      router.push("/account/orders");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const selectedShippingId = shippingId ?? shippingQuery.data?.[0]?.id ?? null;
  const selectedPaymentCode =
    paymentCode ??
    paymentQuery.data?.find((method) =>
      method.code.toLowerCase().includes("cod")
    )?.code ??
    paymentQuery.data?.[0]?.code ??
    null;

  if (!order) {
    return (
      <div className="border-border/60 bg-card rounded-3xl border p-8 text-center">
        <p className="text-lg font-semibold">Your cart is empty</p>
        <p className="text-muted-foreground text-sm">
          Add items before checking out.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full name</Label>
          <Input id="fullName" {...register("fullName")} />
          {errors.fullName && (
            <p className="text-destructive text-sm">
              {errors.fullName.message}
            </p>
          )}
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
      </div>

      <div className="space-y-2">
        <Label htmlFor="streetLine1">Address line 1</Label>
        <Input id="streetLine1" {...register("streetLine1")} />
        {errors.streetLine1 && (
          <p className="text-destructive text-sm">
            {errors.streetLine1.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="streetLine2">Address line 2</Label>
        <Input id="streetLine2" {...register("streetLine2")} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" {...register("city")} />
          {errors.city && (
            <p className="text-destructive text-sm">{errors.city.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal code</Label>
          <Input id="postalCode" {...register("postalCode")} />
          {errors.postalCode && (
            <p className="text-destructive text-sm">
              {errors.postalCode.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <select
            id="country"
            className="border-border/80 w-full rounded-2xl border bg-transparent px-3 py-2 text-sm"
            {...register("countryCode")}
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.countryCode && (
            <p className="text-destructive text-sm">
              {errors.countryCode.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Delivery notes</Label>
        <Textarea id="notes" rows={3} {...register("notes")} />
      </div>

      <div className="space-y-2">
        <Label>Delivery method</Label>
        <div className="grid gap-3">
          {shippingQuery.data?.map((method) => (
            <button
              key={method.id}
              type="button"
              className={`rounded-3xl border p-4 text-left ${
                selectedShippingId === method.id
                  ? "border-primary bg-primary/10"
                  : "border-border/80"
              }`}
              onClick={() => setShippingId(method.id)}
            >
              <p className="font-semibold">{method.name}</p>
              <p className="text-muted-foreground text-sm">
                {method.description} ·{" "}
                {method.priceWithTax === 0
                  ? "Free"
                  : `${formatCurrency(method.priceWithTax, order.currencyCode)} delivery`}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Payment</Label>
        <div className="grid gap-3">
          {paymentQuery.data?.map((method) => (
            <button
              key={method.code}
              type="button"
              className={`rounded-3xl border p-4 text-left ${
                selectedPaymentCode === method.code
                  ? "border-primary bg-primary/10"
                  : "border-border/80"
              }`}
              onClick={() => setPaymentCode(method.code)}
            >
              <p className="font-semibold">{method.name}</p>
              <p className="text-muted-foreground text-sm">
                {method.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full rounded-2xl"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Place order (COD)"}
      </Button>
    </form>
  );
};
