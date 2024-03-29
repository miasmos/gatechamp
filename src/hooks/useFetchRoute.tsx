import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import useSWRImmutable from "swr/immutable";
import { get } from "../api";
import { WebSocketEvent } from "../enum";
import killsState from "../recoil/kills/atom";
import {
  hasLowSecuritySetter,
  hasNullSecuritySetter,
  RouteState,
} from "../recoil/route";
import routeState from "../recoil/route/atom";
import { isLowSecurity, isNullSecurity } from "../util/eve";
import { serializeEvent } from "./useWebSocketKills";

type RouteJumpSummary = {
  solarSystemID: number;
  security: number;
  name: string;
  entry: number;
  exit: number;
};

type RouteSummary = {
  origin: number;
  destination: number;
  jumps: number;
  route: RouteJumpSummary[];
  hasRoute: boolean;
};

type KillSummary = {
  id: number;
  kills: number;
  hics: boolean;
  smartBombs: boolean;
  gateCamp: boolean;
  attackers: number;
  attackerIds: string[];
};

type SolarSystemKillSummary = KillSummary & {
  entry: KillSummary;
  exit: KillSummary;
};

type FetchRouteResult = RouteSummary & { kills: SolarSystemKillSummary[] };

function useFetchRoute(
  originSolarSystemId: number | undefined,
  destinationSolarSystemId: number | undefined,
  avoidedSolarSystems: number[] = [],
  {
    avoidGateCamp = false,
    avoidHics = false,
    avoidSmartBombs = false,
    avoidEntryGateCamp = false,
  }: Pick<
    RouteState,
    "avoidGateCamp" | "avoidHics" | "avoidSmartBombs" | "avoidEntryGateCamp"
  > = {
    avoidGateCamp: false,
    avoidHics: false,
    avoidSmartBombs: false,
    avoidEntryGateCamp: false,
  }
) {
  const [{ subscriptions, bySolarSystem, byStargate }, setKillsState] =
    useRecoilState(killsState);
  const setRouteState = useSetRecoilState(routeState);
  const areInputsValid =
    typeof originSolarSystemId === "number" &&
    originSolarSystemId > 0 &&
    typeof destinationSolarSystemId === "number" &&
    destinationSolarSystemId > 0;
  const avoidedSolarSystemsStr = avoidedSolarSystems.join(",");
  const {
    data = {
      jumps: 0,
      route: [],
      hasRoute: true,
      kills: [],
      origin: -1,
      destination: -1,
    },
    error,
    isLoading,
    isValidating,
  } = useSWRImmutable<FetchRouteResult>(
    areInputsValid
      ? `/v1/route/get?origin=${originSolarSystemId}&destination=${destinationSolarSystemId}&avoidSystems=${avoidedSolarSystemsStr}&avoidGateCamp=${avoidGateCamp}&avoidHics=${avoidHics}&avoidSmartBombs=${avoidSmartBombs}&avoidEntryGateCamp=${avoidEntryGateCamp}`
      : null,
    get,
    {
      revalidateOnReconnect: true,
      revalidateOnFocus: true,
      revalidateIfStale: false,
    }
  );

  useEffect(() => {
    if (data.route.length > 0) {
      const hasLowSecurity = data.route.some((solarSystem) =>
        isLowSecurity(solarSystem.security)
      );
      hasLowSecuritySetter(setRouteState)(hasLowSecurity);
      const hasNullSecurity = data.route.some((solarSystem) =>
        isNullSecurity(solarSystem.security)
      );
      hasNullSecuritySetter(setRouteState)(hasNullSecurity);
    }
  }, [data.route]);

  useEffect(() => {
    if (data.kills.length > 0) {
      const solarSystemEvents: string[] = [];
      const stargateEvents: string[] = [];
      const stargateKillSummaries: Record<string, KillSummary> = {};
      const solarSystemKillSummaries: Record<string, KillSummary> = {};

      data.kills.forEach((kill) => {
        const { id, entry, exit } = kill;
        solarSystemKillSummaries[id.toString()] = kill;
        solarSystemEvents.push(
          serializeEvent(WebSocketEvent.Kills, "solar-system", id)
        );

        if (entry.id) {
          stargateKillSummaries[entry.id.toString()] = entry;
          stargateEvents.push(
            serializeEvent(WebSocketEvent.Kills, "stargate", entry.id)
          );
        }
        if (exit.id) {
          stargateKillSummaries[exit.id.toString()] = exit;
          stargateEvents.push(
            serializeEvent(WebSocketEvent.Kills, "stargate", exit.id)
          );
        }
      });

      const eventIds = solarSystemEvents.concat(stargateEvents);
      const nextAddSubscriptions = eventIds.filter(
        (eventId) => !subscriptions.includes(eventId)
      );
      const nextRemoveSubscriptions = subscriptions.filter(
        (eventId) => !eventIds.includes(eventId)
      );
      const nextSubscriptions = subscriptions.filter(
        (eventId) => !nextAddSubscriptions.includes(eventId)
      );

      setKillsState((state) => ({
        ...state,
        addSubscription: nextAddSubscriptions,
        removeSubscription: nextRemoveSubscriptions,
        subscriptions: nextSubscriptions,
        bySolarSystem: {
          ...bySolarSystem,
          ...solarSystemKillSummaries,
        },
        byStargate: {
          ...byStargate,
          ...stargateKillSummaries,
        },
      }));
    }
  }, [data.kills]);

  return {
    data,
    isLoading,
    isValidating,
    hasError: error,
  };
}

export default useFetchRoute;
export type { FetchRouteResult, RouteJumpSummary, RouteSummary, KillSummary };
