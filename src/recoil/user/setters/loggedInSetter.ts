import { SetterOrUpdater } from "recoil";
import { UserState } from "../atom";

const loggedInSetter =
  (setter: SetterOrUpdater<UserState>) => (loggedIn: boolean) =>
    setter((state) => ({
      ...state,
      loggedIn,
    }));

export default loggedInSetter;
