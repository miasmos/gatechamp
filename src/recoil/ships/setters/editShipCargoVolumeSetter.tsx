import { SetterOrUpdater } from "recoil";
import { CargoBayType } from "../../../enum";
import { Ship, ShipsState } from "../atom";

function editShipCargoVolumeSetter(setter: SetterOrUpdater<ShipsState>) {
  return (index: number, type: CargoBayType, volume: number) =>
    setter(({ ships, ...state }) => {
      const currentShip = ships[index];
      let key: keyof Ship["cargoBay"];
      let currentCargo;

      switch (type) {
        case CargoBayType.FleetHanger:
          key = "fleetHanger";
          currentCargo = currentShip.cargoBay.fleetHanger;
          break;
        case CargoBayType.Main:
        default:
          key = "main";
          currentCargo = currentShip.cargoBay.main;
          break;
      }

      const nextShip = {
        ...currentShip,
        cargoBay: {
          ...currentShip.cargoBay,
          [key]: { ...currentCargo, volume },
        },
      };
      const nextShips = ships.slice();
      nextShips.splice(index, 1, nextShip);
      return {
        ...state,
        ships: nextShips,
      };
    });
}

export default editShipCargoVolumeSetter;
