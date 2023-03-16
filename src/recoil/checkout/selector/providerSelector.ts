import { selector } from "recoil";
import checkoutState from "../atom";

const providerSelector = selector({
  key: "CheckoutState:ProviderSelector",
  get: ({ get }) => get(checkoutState).provider,
});

export default providerSelector;
