import { create } from "zustand";

import type { ActiveOrderFieldsFragment } from "~/gql/graphql";

type CartState = {
  order: ActiveOrderFieldsFragment | null;
};

type CartActions = {
  setOrder: (order: ActiveOrderFieldsFragment | null) => void;
  clear: () => void;
};

export const useCartStore = create<CartState & CartActions>((set) => ({
  order: null,
  setOrder: (order) => set({ order }),
  clear: () => set({ order: null }),
}));
