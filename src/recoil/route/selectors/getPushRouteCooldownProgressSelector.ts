import { selector } from "recoil";
import routeState from "../atom";

const getPushRouteCooldownProgressSelector = selector({
  key: "RouteState:PushRouteCooldownProgress",
  get: ({ get }) => {
    const {
      pushRoute: { cooldownDate },
    } = get(routeState);

    if (typeof cooldownDate !== "number") {
      return 0;
    }
    return (cooldownDate - Date.now()) / 1000; // in seconds
  },
});

export default getPushRouteCooldownProgressSelector;
