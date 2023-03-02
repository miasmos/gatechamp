import { SetterOrUpdater } from "recoil";
import { RouteState } from "../atom";

const avoidGateCampsSetter =
  (setter: SetterOrUpdater<RouteState>) => (value: boolean) =>
    setter((state) => ({
      ...state,
      avoidGateCamps: value,
    }));

export default avoidGateCampsSetter;
