import { SetterOrUpdater } from "recoil";
import { SubscriptionProductResponse } from "../../../hooks/useFetchSubscriptionProduct";
import { CheckoutState } from "../atom";

const productSetter =
  (setter: SetterOrUpdater<CheckoutState>) =>
  (product: SubscriptionProductResponse, priceIndex: number) =>
    setter((state) => ({
      ...state,
      product,
      priceIndex,
    }));

export default productSetter;
