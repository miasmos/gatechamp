import { SetterOrUpdater } from "recoil";
import { RouteState } from "../atom";

const isUsingMyLocationSetter =
  (setter: SetterOrUpdater<RouteState>) => (isUsingMyLocation: boolean) =>
    setter((state: RouteState) => ({ ...state, isUsingMyLocation }));

export default isUsingMyLocationSetter;
