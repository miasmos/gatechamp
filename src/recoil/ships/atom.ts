import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { CargoBayType } from "../../enum";
import { EveShip } from "../../types";

const { persistAtom } = recoilPersist();

type ShipCargoBay<T extends CargoBayType> = {
  volume: number;
  type: T;
};

type Ship = {
  name: string;
  id: string;
  cargoBay: {
    main: ShipCargoBay<CargoBayType.Main>;
    fleetHanger: ShipCargoBay<CargoBayType.FleetHanger>;
  };
  static: EveShip;
};

interface ShipsState {
  ships: Ship[];
  shipsSelected: boolean[];
}

const shipsState = atom<ShipsState>({
  key: "ShipsState",
  default: {
    ships: [],
    shipsSelected: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export default shipsState;
export type { ShipCargoBay, Ship, ShipsState };
