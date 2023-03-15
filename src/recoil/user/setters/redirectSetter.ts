import { SetterOrUpdater } from "recoil";
import { AppRoute } from "../../../enum";
import { UserState } from "../atom";

const redirectSetter =
  (setter: SetterOrUpdater<UserState>) => (redirect: AppRoute | undefined) =>
    setter((state) => ({
      ...state,
      redirect,
    }));

export default redirectSetter;
