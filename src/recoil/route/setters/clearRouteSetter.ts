import { SetterOrUpdater } from "recoil";
import { RouteState } from "../atom";

const clearRouteSetter = (setter: SetterOrUpdater<RouteState>) => () =>
  setter((state) => ({
    ...state,
    route: [],
  }));

export default clearRouteSetter;
