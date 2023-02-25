import { selectorFamily } from "recoil";
import shipsState from "../atom";

const getShipById = selectorFamily({
  key: "ShipsState:GetShip",
  get:
    (id: string) =>
    ({ get }) =>
      get(shipsState).ships.find((ship) => ship.id === id),
});

export default getShipById;
