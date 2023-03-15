import { selector } from "recoil";
import checkoutState from "../atom";

const productQuantitySelector = selector({
  key: "CheckoutState:productQuantitySelector",
  get: ({ get }) => get(checkoutState).productQuantity,
});

export default productQuantitySelector;
