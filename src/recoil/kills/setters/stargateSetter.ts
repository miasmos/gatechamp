import { SetterOrUpdater } from "recoil";
import { KillSummary } from "../../../hooks/useFetchRoute";
import { KillState } from "../atom";

const stargateSetter =
  (setter: SetterOrUpdater<KillState>) =>
  (stargateId: number, kill: KillSummary) => {
    const result = setter(({ byStargate, ...state }) => ({
      ...state,
      byStargate: {
        ...byStargate,
        [stargateId.toString()]: kill,
      },
    }));
    console.log(result);
    return result;
  };

export default stargateSetter;
