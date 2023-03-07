import { SetterOrUpdater } from "recoil";
import { KillSummary } from "../../../hooks/useFetchRoute";
import { KillState } from "../atom";

const stargateSetter =
  (setter: SetterOrUpdater<KillState>) =>
  (stargateId: number, kill: KillSummary) =>
    setter(({ byStargate, ...state }) => ({
      ...state,
      byStargate: {
        ...byStargate,
        [stargateId.toString()]: kill,
      },
    }));

export default stargateSetter;
