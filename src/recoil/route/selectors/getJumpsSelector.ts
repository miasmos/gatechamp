import { selector } from "recoil";
import shipsState from "../atom";

const getJumpsSelector = selector({
  key: "RouteState:Jumps",
  get: ({ get }) => get(shipsState).jumps,
});

export default getJumpsSelector;
