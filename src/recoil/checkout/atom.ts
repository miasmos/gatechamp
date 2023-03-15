import { atom } from "recoil";
import { PaymentProvider } from "../../enum";
import { SubscriptionProductResponse } from "../../hooks/useFetchSubscriptionProduct";

interface CheckoutState {
  productQuantity: number;
  provider: PaymentProvider | undefined;
  product: SubscriptionProductResponse | undefined;
  priceIndex: number;
}

const checkoutState = atom<CheckoutState>({
  key: "CheckoutState",
  default: {
    productQuantity: 1,
    provider: undefined,
    product: undefined,
    priceIndex: 0,
  },
});

export default checkoutState;
export type { CheckoutState };
