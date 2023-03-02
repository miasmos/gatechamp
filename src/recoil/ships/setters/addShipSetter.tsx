import { SetterOrUpdater } from "recoil";
import { generateId } from "../../../util/math";
import { Ship, ShipsState } from "../atom";

const addShipSetter =
  (setter: SetterOrUpdater<ShipsState>) => (ship: Omit<Ship, "id">) =>
    setter(({ ships, shipsSelected, ...state }) => ({
      ...state,
      ships: [...ships, { ...ship, id: generateId() }],
      shipsSelected: [...shipsSelected, true],
    }));

export default addShipSetter;
