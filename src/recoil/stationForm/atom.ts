import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { RouteSecurity, Station, SystemSecurity, Tax } from "../../enum";

const { persistAtom } = recoilPersist();

const stationFormState = atom({
  key: "StationForm",
  default: {
    from: Station.Jita,
    to: Object.values(Station).map(() => true),
    maxBudget: 200, // in millions
    maxWeight: 60000,
    maxWeight2: 5000,
    minProfit: 0.02,
    minRoi: 0.04, // percent
    routeSafety: RouteSecurity.LeastSafe,
    security: Object.values(SystemSecurity).map(() => false),
    tax: Number(Tax.Level3), // percent
  },
  effects_UNSTABLE: [persistAtom],
});

export default stationFormState;
