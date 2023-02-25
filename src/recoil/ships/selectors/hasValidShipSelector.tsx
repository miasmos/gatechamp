import { selector } from "recoil";
import shipsState from "../atom";

const hasValidShipSelector = selector({
  key: "ShipsState:HasValidShip",
  get: ({ get }) => {
    const state = get(shipsState);
    const hasOneValidShip = state.ships.some(
      (ship) => ship.name.length > 0 && ship.cargoBay.main.volume > 0
    );
    return hasOneValidShip && state.ships.length > 0;
  },
});

export default hasValidShipSelector;
