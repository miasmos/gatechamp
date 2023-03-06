import { atom } from "recoil";
import { KillSummary } from "../../hooks/useFetchRoute";

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
});

export default killsState;
export type { KillState };
