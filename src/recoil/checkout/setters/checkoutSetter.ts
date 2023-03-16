import { SetterOrUpdater } from "recoil";
import { CheckoutState } from "../atom";

const checkoutSetter =
  (setter: SetterOrUpdater<CheckoutState>) =>
  (nextState: Partial<CheckoutState>) =>
    setter((state) => ({
      ...state,
      ...nextState,
    }));

export default checkoutSetter;
