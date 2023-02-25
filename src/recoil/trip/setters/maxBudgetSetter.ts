import { SetterOrUpdater } from "recoil";
import { TripState } from "../atom";

const maxBudgetSetter =
  (setter: SetterOrUpdater<TripState>) => (value: number) =>
    setter((state) => ({
      ...state,
      maxBudget: value,
    }));

export default maxBudgetSetter;
