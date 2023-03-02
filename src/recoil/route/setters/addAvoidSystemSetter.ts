import { SetterOrUpdater } from "recoil";
import { AvoidedSolarSystem, RouteState } from "../atom";

const addAvoidSystemSetter =
  (setter: SetterOrUpdater<RouteState>) => (item: AvoidedSolarSystem) =>
    setter(({ avoidedSolarSystems, ...state }) => ({
      ...state,
      avoidedSolarSystems: [...avoidedSolarSystems, item],
    }));

export default addAvoidSystemSetter;
