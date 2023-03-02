import { SetterOrUpdater } from "recoil";
import { Station } from "../../../enum";
import { TripState } from "../atom";

const clearTripSetter = (setter: SetterOrUpdater<TripState>) => () =>
  setter((state) => ({
    ...state,
    to: Object.values(Station)
      .filter((value) => value !== "0")
      .map(() => true),
  }));

export default clearTripSetter;
