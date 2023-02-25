import { SetterOrUpdater } from "recoil";
import { ShipsState } from "../atom";

const deleteShipSetter =
  (setter: SetterOrUpdater<ShipsState>) => (index: number) =>
    setter(({ ships, ...state }) => {
      const nextShips = ships.slice();
      nextShips.splice(index, 1);
      return {
        ...state,
        ships: nextShips,
      };
    });

export default deleteShipSetter;
