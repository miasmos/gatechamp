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
  avoidGateCamp: boolean;
  avoidEntryGateCamp: boolean;
  avoidHics: boolean;
  avoidSmartBombs: boolean;
}

const routeState = atom<RouteState>({
  key: "RouteState",
  default: {
    origin: undefined,
    destination: undefined,
    avoidedSolarSystems: [],
    avoidGateCamp: false,
    avoidEntryGateCamp: false,
    avoidHics: false,
    avoidSmartBombs: false,
  },
  effects_UNSTABLE: [persistAtom],
});

export default routeState;
export type { RouteState, AvoidedSolarSystem };
