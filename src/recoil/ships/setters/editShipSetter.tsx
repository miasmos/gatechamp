import { SetterOrUpdater } from "recoil";
import { Ship, ShipsState } from "../atom";

const editShipSetter =
  (setter: SetterOrUpdater<ShipsState>) => (index: number, ship: Ship) =>
    setter(({ ships, ...state }) => {
      const nextShips = ships.slice();
      nextShips.splice(index, 1, ship);
      return {
        ...state,
        ships: nextShips,
      };
    });

export default editShipSetter;
