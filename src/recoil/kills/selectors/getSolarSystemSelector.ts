import { selectorFamily } from "recoil";
import { KillSummary } from "../../../hooks/useFetchRoute";
import killsState from "../atom";

const getSolarSystemSelector = selectorFamily({
  key: "KillState:SolarSystem",
  get:
    (solarSystemId: number | undefined) =>
    ({ get }): KillSummary => {
      const solarSystems = get(killsState).bySolarSystem;
      if (solarSystemId) {
        const solarSystemIdStr = solarSystemId?.toString();
        if (solarSystemIdStr in solarSystems) {
          return solarSystems[solarSystemIdStr];
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

export default getSolarSystemSelector;
