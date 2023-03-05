import { selector } from "recoil";
import routeState from "../atom";

const getJumpsSelector = selector({
  key: "RouteState:Jumps",
  get: ({ get }) => get(routeState).jumps,
});

export default getJumpsSelector;
