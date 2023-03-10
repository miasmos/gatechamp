import { SetterOrUpdater } from "recoil";
import { PushRouteState, RouteState } from "../atom";

const pushRouteSetter =
  (setter: SetterOrUpdater<RouteState>) =>
  (nextPushRoute: Partial<PushRouteState>) =>
    setter(({ pushRoute, ...state }) => ({
      ...state,
      pushRoute: {
        ...pushRoute,
        ...nextPushRoute,
      },
    }));

export default pushRouteSetter;
