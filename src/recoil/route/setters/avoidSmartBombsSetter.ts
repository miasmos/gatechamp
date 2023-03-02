import { SetterOrUpdater } from "recoil";
import { RouteState } from "../atom";

const avoidSmartBombsSetter =
  (setter: SetterOrUpdater<RouteState>) => (value: boolean) =>
    setter((state) => ({
      ...state,
      avoidSmartBombs: value,
    }));

export default avoidSmartBombsSetter;
