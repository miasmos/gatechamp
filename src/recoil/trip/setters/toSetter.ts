import { SetterOrUpdater } from "recoil";
import { Station } from "../../../enum";
import { TripState } from "../atom";

const toSetter =
  (setter: SetterOrUpdater<TripState>) =>
  (currentTo: boolean[], currentValue: Station, value: boolean) => {
    const nextArr = currentTo.slice();
    const index = Object.values(Station).findIndex(
      (value) => value === currentValue
    );
    nextArr[index] = value;
    setter((state: TripState) => ({ ...state, to: nextArr }));
  };

export default toSetter;
