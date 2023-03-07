import { atom } from "recoil";

type AvoidedSolarSystem = {
  name: string;
  solarSystemID: number;
};

interface RouteState {
  origin: number | undefined;
  destination: number | undefined;
  originName: string;
  destinationName: string;
  avoidedSolarSystems: AvoidedSolarSystem[];
  avoidGateCamp: boolean;
  avoidEntryGateCamp: boolean;
  avoidHics: boolean;
  avoidSmartBombs: boolean;
  jumps: number;
}

const routeState = atom<RouteState>({
  key: "RouteState",
  default: {
    origin: undefined,
    destination: undefined,
    originName: "",
    destinationName: "",
    avoidedSolarSystems: [],
    avoidGateCamp: false,
    avoidEntryGateCamp: false,
    avoidHics: false,
    avoidSmartBombs: false,
    jumps: 0,
  },
});

export default routeState;
export type { RouteState, AvoidedSolarSystem };
