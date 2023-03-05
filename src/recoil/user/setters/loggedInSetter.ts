import { SetterOrUpdater } from "recoil";
import { UserState } from "../atom";

const loggedInSetter = (setter: SetterOrUpdater<UserState>) => () =>
  setter((state) => ({
    ...state,
    loggedIn: false,
    activeCharacter: -1,
  }));

export default loggedInSetter;
