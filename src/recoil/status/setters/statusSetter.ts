import { SetterOrUpdater } from "recoil";
import { StatusState, UserStatus } from "../atom";

const statusSetter =
  (setter: SetterOrUpdater<StatusState>) => (status: UserStatus) =>
    setter((state) => ({
      ...state,
      status,
    }));

export default statusSetter;
