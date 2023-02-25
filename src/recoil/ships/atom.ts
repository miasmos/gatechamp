import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { CargoBayType } from "../../enum";

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
};

interface ShipsState {
  ships: Ship[];
}

const shipsState = atom<ShipsState>({
  key: "ShipsState",
  default: {
    ships: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export default shipsState;
export type { ShipCargoBay, Ship, ShipsState };
