import { selectorFamily } from "recoil";
import { RouteJumpSummary } from "../../../hooks/useFetchRoute";
import {
  getDisplaySecurity,
  isCrossingSecurityBoundary,
} from "../../../util/eve";
import killsState from "../atom";

const getTitleSequenceSelector = selectorFamily({
  key: "KillState:GetTitleSequence",
  get:
    (route: RouteJumpSummary[]) =>
    ({ get }) => {
      // display title always only if there's kills in the current system
      // and either we've crossed into lower security or will cross into higher security
      // helps with readability
      const killsBySolarSystem = get(killsState).bySolarSystem;
      const sequence: boolean[] = [];
      for (let i = 0; i < route.length; i++) {
        const item = route[i];
        const lastItem = i === 0 ? undefined : route[i - 1];
        const nextItem = i === route.length - 1 ? undefined : route[i + 1];
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
        const isDisplayingLastItem = i === 0 ? false : sequence[i - 1];
        const itemDisplaySecurity = getDisplaySecurity(item.security);
        const nextItemDisplaySecurity = getDisplaySecurity(nextItem?.security);
        const lastItemDisplaySecurity = getDisplaySecurity(lastItem?.security);
        const currentIndexCrossingBoundary = isCrossingSecurityBoundary(
          lastItemDisplaySecurity,
          itemDisplaySecurity
        );
        const nextIndexCrossingBoundary = isCrossingSecurityBoundary(
          itemDisplaySecurity,
          nextItemDisplaySecurity
        );
        const currentIndexHasKills = Boolean(
          currentKill?.kills && currentKill?.kills > 0
        );

        const crossedIntoLowerSecurity = currentIndexCrossingBoundary.isLower;
        const willCrossIntoHigherSecurity = nextIndexCrossingBoundary.isHigher;
        const showCurrentItem =
          (currentIndexHasKills ||
            crossedIntoLowerSecurity ||
            willCrossIntoHigherSecurity) &&
          !isDisplayingLastItem;
        sequence.push(showCurrentItem);
      }
      return sequence;
    },
});

export default getTitleSequenceSelector;
