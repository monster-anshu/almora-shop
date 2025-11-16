import { CartContent } from "~/components/cart/cart-content";

const CartPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
      <div>
        <h1 className="text-3xl font-semibold">Your cart</h1>
        <p className="text-muted-foreground">
          Review items before heading to checkout.
        </p>
      </div>
      <CartContent />
    </div>
  );
};

export default CartPage;
