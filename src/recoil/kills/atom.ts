import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { KillSummary } from "../../hooks/useFetchRoute";

const { persistAtom } = recoilPersist();

interface KillState {
  subscriptions: string[];
  addSubscription: string[];
  removeSubscription: string[];
  bySolarSystem: Record<string, KillSummary>;
  byStargate: Record<string, KillSummary>;
}

const killsState = atom<KillState>({
  key: "KillsState",
  default: {
    subscriptions: [],
    addSubscription: [],
    removeSubscription: [],
    bySolarSystem: {},
    byStargate: {},
  },
  effects_UNSTABLE: [persistAtom],
});

export default killsState;
export type { KillState };
