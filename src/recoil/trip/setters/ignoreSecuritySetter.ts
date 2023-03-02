import { SetterOrUpdater } from "recoil";
import { SystemSecurity } from "../../../enum";
import { TripState } from "../atom";

const ignoreSecuritySetter =
  (setter: SetterOrUpdater<TripState>) =>
  (
    currentSecurity: boolean[],
    currentValue: SystemSecurity,
    value: boolean
  ) => {
    const nextArr = currentSecurity.slice();
    const index = Object.values(SystemSecurity).findIndex(
      (value) => value === currentValue
    );
    nextArr[index] = value;
    setter((state: TripState) => ({ ...state, security: nextArr }));
  };

export default ignoreSecuritySetter;
