import { selector } from "recoil";
import shipsState from "../atom";

const getShipCountSelector = selector({
  key: "ShipsState:Count",
  get: ({ get }) => {
    const state = get(shipsState);
    return state.ships.length;
  },
});

export default getShipCountSelector;
