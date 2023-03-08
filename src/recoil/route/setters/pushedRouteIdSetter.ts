import { SetterOrUpdater } from "recoil";
import { RouteState } from "../atom";

const pushedRouteId =
  (setter: SetterOrUpdater<RouteState>) => (shouldReset?: boolean) =>
    setter(({ pushedRouteId, ...state }) => ({
      ...state,
      pushedRouteId: shouldReset
        ? undefined
        : typeof pushedRouteId === "number"
        ? pushedRouteId + 1
        : 0,
    }));

export default pushedRouteId;
