import { selector } from "recoil";
import routeState from "../atom";

const canPushRouteSelector = selector({
  key: "RouteState:CanPushRoute",
  get: ({ get }) => {
    const {
      pushRoute: { isPushing, cooldownDate, route, didPushRoute },
    } = get(routeState);
    const hasCooldown =
      typeof cooldownDate === "number" && cooldownDate - Date.now() > 0;
    return !isPushing && !hasCooldown && route.length > 0 && !didPushRoute;
  },
});

export default canPushRouteSelector;
