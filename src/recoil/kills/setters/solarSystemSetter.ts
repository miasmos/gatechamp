import { SetterOrUpdater } from "recoil";
import { KillSummary } from "../../../hooks/useFetchRoute";
import { KillState } from "../atom";

const solarSystemSetter =
  (setter: SetterOrUpdater<KillState>) =>
  (solarSystemId: number, kill: KillSummary) =>
    setter(({ bySolarSystem, ...state }) => ({
      ...state,
      bySolarSystem: {
        ...bySolarSystem,
        [solarSystemId.toString()]: kill,
      },
    }));

export default solarSystemSetter;
