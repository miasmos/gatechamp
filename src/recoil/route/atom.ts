import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

type AvoidedSolarSystem = {
  name: string;
  solarSystemID: number;
};

interface RouteState {
  origin: number | undefined;
  destination: number | undefined;
  avoidedSolarSystems: AvoidedSolarSystem[];
  avoidGateCamps: boolean;
  avoidHics: boolean;
  avoidSmartBombs: boolean;
}

const routeState = atom<RouteState>({
  key: "RouteState",
  default: {
    origin: undefined,
    destination: undefined,
    avoidedSolarSystems: [],
    avoidGateCamps: false,
    avoidHics: false,
    avoidSmartBombs: false,
  },
  effects_UNSTABLE: [persistAtom],
});

export default routeState;
export type { RouteState, AvoidedSolarSystem };
