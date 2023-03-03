import { SetterOrUpdater } from "recoil";
import { EveShip } from "../../../types";
import { ShipsState } from "../atom";

const editShipStaticSetter =
  (setter: SetterOrUpdater<ShipsState>) =>
  (index: number, staticData: EveShip) =>
    setter(({ ships, ...state }) => {
      const nextShips = ships.slice();
      const ship = nextShips[index];
      nextShips.splice(index, 1, { ...ship, static: staticData });
      return {
        ...state,
        ships: nextShips,
      };
    });

export default editShipStaticSetter;
