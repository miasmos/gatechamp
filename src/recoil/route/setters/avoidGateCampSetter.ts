import { SetterOrUpdater } from "recoil";
import { RouteState } from "../atom";

const avoidGateCampSetter =
  (setter: SetterOrUpdater<RouteState>) => (value: boolean) =>
    setter((state) => ({
      ...state,
      avoidGateCamp: value,
    }));

export default avoidGateCampSetter;
