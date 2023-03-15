import { selector } from "recoil";
import checkoutState from "../atom";

const productSelector = selector({
  key: "CheckoutState:Product",
  get: ({ get }) => get(checkoutState).product,
});

export default productSelector;
