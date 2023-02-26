import { SetterOrUpdater } from "recoil";
import { generateId } from "../../../util/math";
import { TripState } from "../atom";

const generateIdSetter = (setter: SetterOrUpdater<TripState>) => () =>
  setter((state: TripState) => ({ ...state, id: generateId() }));

export default generateIdSetter;
