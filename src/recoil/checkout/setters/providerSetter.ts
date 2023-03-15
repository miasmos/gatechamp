import { SetterOrUpdater } from "recoil";
import { PaymentProvider } from "../../../enum";
import { CheckoutState } from "../atom";

const providerSetter =
  (setter: SetterOrUpdater<CheckoutState>) => (provider: PaymentProvider) =>
    setter((state) => ({
      ...state,
      provider,
    }));

export default providerSetter;
