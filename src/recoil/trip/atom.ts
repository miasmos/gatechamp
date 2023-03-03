import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Station, Tax } from "../../enum";

const { persistAtom } = recoilPersist();

interface TripState {
  id: string;
  otherCargo: number;
  from: boolean[];
  to: boolean[];
  maxBudget: number;
  minProfit: number;
  minRoi: number;
  tax: number;
}

const tripState = atom<TripState>({
  key: "TripState",
  default: {
    id: "1", // used as api call unique id, refetch when it changes
    from: Object.values(Station)
      .filter((value) => value !== "0")
      .map(() => true),
    to: Object.values(Station)
      .filter((value) => value !== "0")
      .map(() => true),
    maxBudget: 200, // in millions
    minProfit: 0.02,
    minRoi: 0.04, // percent
    tax: Number(Tax.Level3), // percent
    otherCargo: 0,
  },
  effects_UNSTABLE: [persistAtom],
});

export default tripState;
export type { TripState };
