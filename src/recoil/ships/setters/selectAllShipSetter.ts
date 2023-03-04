import { SetterOrUpdater } from "recoil";
import { ShipsState } from "../atom";

const selectAllShipSetter =
  (setter: SetterOrUpdater<ShipsState>) =>
  (currentSelectedShips: boolean[], value: boolean) => {
    const nextArr = currentSelectedShips.map(() => value);
    setter((state: ShipsState) => ({ ...state, shipsSelected: nextArr }));
  };

export default selectAllShipSetter;
