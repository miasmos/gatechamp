import { SetterOrUpdater } from "recoil";
import { RouteState } from "../atom";

const hasNullSecuritySetter =
  (setter: SetterOrUpdater<RouteState>) => (value: boolean) =>
    setter((state) => ({
      ...state,
      hasNullSecurity: value,
    }));

export default hasNullSecuritySetter;
