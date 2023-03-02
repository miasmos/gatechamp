import { SetterOrUpdater } from "recoil";
import { RouteState } from "../atom";

const deleteAvoidSystemSetter =
  (setter: SetterOrUpdater<RouteState>) => (index: number) =>
    setter(({ avoidedSolarSystems, ...state }) => {
      const nextAvoidedSolarSystems = avoidedSolarSystems.slice();
      nextAvoidedSolarSystems.splice(index, 1);
      return {
        ...state,
        avoidedSolarSystems: nextAvoidedSolarSystems,
      };
    });

export default deleteAvoidSystemSetter;
