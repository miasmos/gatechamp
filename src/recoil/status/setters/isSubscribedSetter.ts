import { SetterOrUpdater } from "recoil";
import { StatusState } from "../atom";

const isSubscribedSetter =
  (setter: SetterOrUpdater<StatusState>) => (isSubscribed: boolean) =>
    setter((state) => ({
      ...state,
      isSubscribed,
    }));

export default isSubscribedSetter;
