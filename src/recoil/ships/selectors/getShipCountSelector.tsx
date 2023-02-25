import { selector } from "recoil";
import shipsState from "../atom";

const getShipCountSelector = selector({
  key: "ShipsState:Count",
  get: ({ get }) => get(shipsState).ships.length,
});

export default getShipCountSelector;
