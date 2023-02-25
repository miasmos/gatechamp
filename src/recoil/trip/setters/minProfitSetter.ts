import { SetterOrUpdater } from "recoil";
import { TripState } from "../atom";

const minProfitSetter =
  (setter: SetterOrUpdater<TripState>) => (value: number) =>
    setter((state) => ({
      ...state,
      minProfit: value,
    }));

export default minProfitSetter;
