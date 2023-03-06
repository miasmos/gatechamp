import { SetterOrUpdater } from "recoil";
import { KillSummary } from "../../../hooks/useFetchRoute";
import { KillState } from "../atom";

const solarSystemSetter =
  (setter: SetterOrUpdater<KillState>) =>
  (solarSystemId: number, kill: KillSummary) => {
    const result = setter(({ bySolarSystem, ...state }) => ({
      ...state,
      bySolarSystem: {
        ...bySolarSystem,
        [solarSystemId.toString()]: kill,
      },
    }));
    console.log(result);
    return result;
  };
export default solarSystemSetter;
