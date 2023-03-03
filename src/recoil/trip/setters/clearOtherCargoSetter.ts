import { SetterOrUpdater } from "recoil";
import { TripState } from "../atom";

const clearOtherCargoSetter = (setter: SetterOrUpdater<TripState>) => () =>
  setter((state) => ({
    ...state,
    otherCargo: 0,
  }));

export default clearOtherCargoSetter;
