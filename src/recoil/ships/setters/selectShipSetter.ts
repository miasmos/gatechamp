import { SetterOrUpdater } from "recoil";
import { ShipsState } from "../atom";

const selectShipSetter =
  (setter: SetterOrUpdater<ShipsState>) =>
  (currentSelectedShips: boolean[], index: number, value: boolean) => {
    const nextArr = currentSelectedShips.slice();
    nextArr[index] = value;
    setter((state: ShipsState) => ({ ...state, shipsSelected: nextArr }));
  };

export default selectShipSetter;
