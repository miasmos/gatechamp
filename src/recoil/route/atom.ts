import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

type AvoidedSolarSystem = {
  name: string;
  solarSystemID: number;
};

type PushRouteState = {
  isPushing: boolean;
  progress: number;
  cooldownDate: number | undefined;
  shouldPushRoute: boolean;
  route: number[];
  didPushRoute: boolean;
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
  hasLowSecurity: boolean;
  hasNullSecurity: boolean;
  jumps: number;
  isUsingMyLocation: boolean;
  pushRoute: PushRouteState;
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
    hasNullSecurity: false,
    hasLowSecurity: false,
    jumps: 0,
    isUsingMyLocation: false,
    pushRoute: {
      isPushing: false,
      progress: 1,
      cooldownDate: undefined,
      shouldPushRoute: false,
      route: [],
      didPushRoute: false,
    },
  },
  effects_UNSTABLE: [persistAtom],
});

export default routeState;
export type { RouteState, AvoidedSolarSystem, PushRouteState };
