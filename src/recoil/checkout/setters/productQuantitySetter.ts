import { SetterOrUpdater } from "recoil";
import { CheckoutState } from "../atom";

const productQuantitySetter =
  (setter: SetterOrUpdater<CheckoutState>) => (productQuantity: number) =>
    setter((state) => ({
      ...state,
      productQuantity,
    }));

export default productQuantitySetter;
