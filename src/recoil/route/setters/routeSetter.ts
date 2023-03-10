import { SetterOrUpdater } from "recoil";
import { RouteState } from "../atom";

const routeSetter =
  (setter: SetterOrUpdater<RouteState>) => (solarSystemIds: number[]) =>
    setter(({ pushRoute, ...state }) => ({
      ...state,
      pushRoute: { ...pushRoute, route: solarSystemIds },
    }));

export default routeSetter;
