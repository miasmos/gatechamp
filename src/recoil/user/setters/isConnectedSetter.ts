import { SetterOrUpdater } from "recoil";
import { UserState } from "../atom";

const isConnectedSetter =
  (setter: SetterOrUpdater<UserState>) => (value: boolean) =>
    setter((state) => ({
      ...state,
      isConnected: value,
    }));

export default isConnectedSetter;
