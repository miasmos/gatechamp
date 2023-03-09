import { selectorFamily } from "recoil";
import { RouteJumpSummary } from "../../../hooks/useFetchRoute";
import killsState from "../atom";

const getTitleSequenceSelector = selectorFamily({
  key: "KillState:GetTitleSequence",
  get:
    (route: RouteJumpSummary[]) =>
    ({ get }) => {
      // display title always only if there's kills in the current system and not in the last
      // helps with readability
      const killsBySolarSystem = get(killsState).bySolarSystem;
      const sequence: boolean[] = [];
      for (let i = 0; i < route.length; i++) {
        const item = route[i];
        const lastItem = i === 0 ? undefined : route[i - 1];
        const currentKill =
          item.solarSystemID in killsBySolarSystem
            ? killsBySolarSystem[item.solarSystemID]
            : undefined;
        let lastKill = undefined;

        if (lastItem) {
          lastKill =
            lastItem.solarSystemID in killsBySolarSystem
              ? killsBySolarSystem[lastItem.solarSystemID]
              : undefined;
        }

        const lastIndexHadKills = lastKill?.kills && lastKill?.kills > 0;
        const currentIndexHasKills =
          currentKill?.kills && currentKill?.kills > 0;
        let showCurrentItem =
          (currentIndexHasKills && !lastIndexHadKills) || false;
        sequence.push(showCurrentItem);
      }
      return sequence;
    },
});

export default getTitleSequenceSelector;
