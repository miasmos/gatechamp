import { SetterOrUpdater } from "recoil";
import { UserState } from "../atom";

const subscribedSetter =
  (setter: SetterOrUpdater<UserState>) => (isSubscribed: boolean) =>
    setter((state) => ({
      ...state,
      isSubscribed,
    }));

export default subscribedSetter;
