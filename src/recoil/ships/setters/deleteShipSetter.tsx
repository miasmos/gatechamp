import { SetterOrUpdater } from "recoil";
import { ShipsState } from "../atom";

const deleteShipSetter =
  (setter: SetterOrUpdater<ShipsState>) => (index: number) =>
    setter(({ ships, shipsSelected, ...state }) => {
      const nextShips = ships.slice();
      const nextShipsSelected = shipsSelected.slice();
      nextShips.splice(index, 1);
      nextShipsSelected.splice(index, 1);
      return {
        ...state,
        ships: nextShips,
        shipsSelected: nextShipsSelected,
      };
    });

export default deleteShipSetter;
