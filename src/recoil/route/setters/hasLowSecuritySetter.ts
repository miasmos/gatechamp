import { SetterOrUpdater } from "recoil";
import { RouteState } from "../atom";

const hasLowSecuritySetter =
  (setter: SetterOrUpdater<RouteState>) => (value: boolean) =>
    setter((state) => ({
      ...state,
      hasLowSecurity: value,
    }));

export default hasLowSecuritySetter;
