import { selector } from "recoil";
import checkoutState from "../atom";

const priceSelector = selector({
  key: "CheckoutState:PriceSelector",
  get: ({ get }) => {
    const { product, priceIndex } = get(checkoutState);
    if (!product) {
      return undefined;
    }
    return product.prices[priceIndex];
  },
});

export default priceSelector;
