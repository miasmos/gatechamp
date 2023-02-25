import atom from "./atom";
import { Ship, ShipCargoBay, ShipsState } from "./atom";
import hasValidShipSelector from "./selectors/hasValidShipSelector";
import getShipCountSelector from "./selectors/getShipCountSelector";
import addShipSetter from "./setters/addShipSetter";
import editShipSetter from "./setters/editShipSetter";
import editShipCargoVolumeSetter from "./setters/editShipCargoVolumeSetter";
import deleteShipSetter from "./setters/deleteShipSetter";

export default atom;
export { hasValidShipSelector, getShipCountSelector };
export {
  addShipSetter,
  editShipSetter,
  editShipCargoVolumeSetter,
  deleteShipSetter,
};
export type { Ship, ShipCargoBay, ShipsState };
