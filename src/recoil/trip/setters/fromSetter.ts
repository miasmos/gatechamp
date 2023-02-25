import { SetterOrUpdater } from "recoil";
import { Station } from "../../../enum";
import { TripState } from "../atom";

const fromSetter = (setter: SetterOrUpdater<TripState>) => (from: Station) =>
  setter((state) => ({
    ...state,
    from,
  }));

export default fromSetter;
