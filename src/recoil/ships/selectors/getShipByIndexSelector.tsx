import { selectorFamily } from "recoil";
import shipsState from "../atom";

const getShipByIndexSelector = selectorFamily({
  key: "ShipsState:ShipByIndex",
  get:
    (index: number) =>
    ({ get }) =>
      get(shipsState).ships[index],
});

export default getShipByIndexSelector;
