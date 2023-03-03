import atom from "./atom";
import { Ship, ShipCargoBay, ShipsState } from "./atom";
import hasValidShipSelector from "./selectors/hasValidShipSelector";
import getShipCountSelector from "./selectors/getShipCountSelector";
import addShipSetter from "./setters/addShipSetter";
import editShipSetter from "./setters/editShipSetter";
import editShipCargoVolumeSetter from "./setters/editShipCargoVolumeSetter";
import deleteShipSetter from "./setters/deleteShipSetter";
import selectShipSetter from "./setters/selectShipSetter";
import getSelectedShipsSelector from "./selectors/getSelectedShipsSelector";
import editShipStaticSetter from "./setters/editShipStaticSetter";
import getShipByIndexSelector from "./selectors/getShipByIndexSelector";

export default atom;
export {
  hasValidShipSelector,
  getShipCountSelector,
  getSelectedShipsSelector,
  getShipByIndexSelector,
};
export {
  addShipSetter,
  editShipSetter,
  editShipCargoVolumeSetter,
  deleteShipSetter,
  selectShipSetter,
  editShipStaticSetter,
};
export type { Ship, ShipCargoBay, ShipsState };
