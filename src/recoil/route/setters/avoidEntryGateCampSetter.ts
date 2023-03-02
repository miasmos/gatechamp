import { SetterOrUpdater } from "recoil";
import { RouteState } from "../atom";

const avoidEntryGateCampSetter =
  (setter: SetterOrUpdater<RouteState>) => (value: boolean) =>
    setter((state) => ({
      ...state,
      avoidEntryGateCamp: value,
    }));

export default avoidEntryGateCampSetter;
