import { selector } from "recoil";
import checkoutState from "../atom";

const isCheckoutValidSelector = selector({
  key: "CheckoutState:IsCheckoutValid",
  get: ({ get }) => {
    const { product, priceIndex, provider } = get(checkoutState);
    return (
      Boolean(provider) &&
      Boolean(product) &&
      priceIndex >= 0 &&
      priceIndex < (product?.prices?.length || -1)
    );
  },
});

export default isCheckoutValidSelector;
