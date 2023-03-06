import { selectorFamily } from "recoil";
import { KillSummary } from "../../../hooks/useFetchRoute";
import killsState from "../atom";

const getStargateSelector = selectorFamily({
  key: "KillState:Stargate",
  get:
    (stargateId: number | undefined) =>
    ({ get }): KillSummary => {
      const stargates = get(killsState).byStargate;
      if (stargateId) {
        const stargateIdStr = stargateId?.toString();
        if (stargateIdStr in stargates) {
          return stargates[stargateIdStr];
        }
      }

      return {
        id: 0,
        kills: 0,
        hics: false,
        smartBombs: false,
        gateCamp: false,
        attackers: 0,
        attackerIds: [],
      };
    },
});

export default getStargateSelector;
