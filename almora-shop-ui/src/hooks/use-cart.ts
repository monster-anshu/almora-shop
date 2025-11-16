"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  ActiveOrderDocument,
  AddItemToOrderDocument,
  AdjustOrderLineDocument,
  RemoveOrderLineDocument,
} from "~/data/graphql-documents";
import type { ActiveOrderFieldsFragment } from "~/gql/graphql";
import { browserGraphQLClient } from "~/lib/graphql-client";
import { useCartStore } from "~/store/cart";

const orderQueryKey = ["active-order"];

const ensureOrderResult = (
  result: {
    __typename?: string | null;
    message?: string | null;
  } & Partial<ActiveOrderFieldsFragment>
) => {
  if (result.__typename !== "Order") {
    throw new Error(result.message ?? "Unable to update cart");
  }

  return result as ActiveOrderFieldsFragment;
};

export const useActiveOrderQuery = () => {
  const setOrder = useCartStore((state) => state.setOrder);

  return useQuery({
    queryKey: orderQueryKey,
    queryFn: async () => {
      const data = await browserGraphQLClient.request(ActiveOrderDocument);
      const order = data.activeOrder ?? null;
      setOrder(order);
      return order;
    },
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const setOrder = useCartStore((state) => state.setOrder);

  return useMutation({
    mutationFn: async ({
      productVariantId,
      quantity,
    }: {
      productVariantId: string;
      quantity: number;
    }) => {
      const data = await browserGraphQLClient.request(AddItemToOrderDocument, {
        productVariantId,
        quantity,
      });
      return ensureOrderResult(data.addItemToOrder);
    },
    onSuccess(order) {
      setOrder(order);
      queryClient.setQueryData(orderQueryKey, order);
      toast.success("Added to cart");
    },
    onError(error) {
      toast.error(error.message);
    },
  });
};

export const useUpdateCartLine = () => {
  const queryClient = useQueryClient();
  const setOrder = useCartStore((state) => state.setOrder);

  return useMutation({
    mutationFn: async ({
      orderLineId,
      quantity,
    }: {
      orderLineId: string;
      quantity: number;
    }) => {
      const data = await browserGraphQLClient.request(AdjustOrderLineDocument, {
        orderLineId,
        quantity,
      });
      return ensureOrderResult(data.adjustOrderLine);
    },
    onSuccess(order) {
      setOrder(order);
      queryClient.setQueryData(orderQueryKey, order);
    },
    onError(error) {
      toast.error(error.message);
    },
  });
};

export const useRemoveCartLine = () => {
  const queryClient = useQueryClient();
  const setOrder = useCartStore((state) => state.setOrder);

  return useMutation({
    mutationFn: async ({ orderLineId }: { orderLineId: string }) => {
      const data = await browserGraphQLClient.request(RemoveOrderLineDocument, {
        orderLineId,
      });
      return ensureOrderResult(data.removeOrderLine);
    },
    onSuccess(order) {
      setOrder(order);
      queryClient.setQueryData(orderQueryKey, order);
    },
    onError(error) {
      toast.error(error.message);
    },
  });
};
