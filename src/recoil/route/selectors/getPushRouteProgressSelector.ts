import { selector } from "recoil";
import routeState from "../atom";

const getPushRouteProgressSelector = selector({
  key: "RouteState:PushRouteProgressSelector",
  get: ({ get }) => get(routeState).pushRoute.progress,
});

export default getPushRouteProgressSelector;
