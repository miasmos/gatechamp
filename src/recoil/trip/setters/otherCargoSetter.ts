import { SetterOrUpdater } from "recoil";
import { TripState } from "../atom";

const otherCargoSetter =
  (setter: SetterOrUpdater<TripState>) => (value: string) =>
    setter((state) => ({
      ...state,
      otherCargo: Number(value),
    }));

export default otherCargoSetter;
