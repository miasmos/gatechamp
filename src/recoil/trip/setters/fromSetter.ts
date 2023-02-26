import { SetterOrUpdater } from "recoil";
import { Station } from "../../../enum";
import { TripState } from "../atom";

const fromSetter =
  (setter: SetterOrUpdater<TripState>) =>
  (currentFrom: boolean[], currentValue: Station, value: boolean) => {
    const nextArr = currentFrom.slice();
    const index = Object.values(Station).findIndex(
      (value) => value === currentValue
    );
    nextArr[index] = value;
    setter((state: TripState) => ({ ...state, from: nextArr }));
  };

export default fromSetter;
