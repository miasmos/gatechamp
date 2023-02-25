import { SetterOrUpdater } from "recoil";
import { TripState } from "../atom";

const minRoiSetter = (setter: SetterOrUpdater<TripState>) => (value: number) =>
  setter((state) => ({
    ...state,
    minRoi: value,
  }));

export default minRoiSetter;
