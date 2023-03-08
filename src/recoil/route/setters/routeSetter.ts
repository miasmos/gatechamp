import { SetterOrUpdater } from "recoil";
import { RouteState } from "../atom";

const routeSetter =
  (setter: SetterOrUpdater<RouteState>) => (solarSystemIds: number[]) =>
    setter((state) => ({
      ...state,
      route: solarSystemIds,
    }));

export default routeSetter;
