import { SetterOrUpdater } from "recoil";
import { TripState } from "../atom";

const taxSetter = (setter: SetterOrUpdater<TripState>) => (tax: number) =>
  setter((state) => ({
    ...state,
    tax,
  }));

export default taxSetter;
