import { SetterOrUpdater } from "recoil";
import { RouteState } from "../atom";

const avoidHicsSetter =
  (setter: SetterOrUpdater<RouteState>) => (value: boolean) =>
    setter((state) => ({
      ...state,
      avoidHics: value,
    }));

export default avoidHicsSetter;
