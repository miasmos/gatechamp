import { selector } from "recoil";
import routeState from "../atom";

const getIsUsingMyLocationSelector = selector({
  key: "RouteState:isUsingMyLocation",
  get: ({ get }) => get(routeState).isUsingMyLocation,
});

export default getIsUsingMyLocationSelector;
