import { SetterOrUpdater } from "recoil";
import { UserState } from "../atom";

const userSetter =
  (setter: SetterOrUpdater<UserState>) => (nextState: Partial<UserState>) =>
    setter((state) => ({
      ...state,
      ...nextState,
    }));

export default userSetter;
