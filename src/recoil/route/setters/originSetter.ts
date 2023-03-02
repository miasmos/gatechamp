import { SetterOrUpdater } from "recoil";
import { RouteState } from "../atom";

const originSetter =
  (setter: SetterOrUpdater<RouteState>) => (origin: number) =>
    setter((state) => ({
      ...state,
      origin,
    }));

export default originSetter;
