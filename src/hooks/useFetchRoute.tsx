import useSWR from "swr";
import { getEveTradePlus } from "../api";
import { RouteState } from "../recoil/route";

type StargateSummary = {
  stargateID: number;
  kills: number;
  hics: boolean;
  smartBombs: boolean;
  gateCamp: boolean; // for gates within our path
};

type SolarSystemSummary = {
  index: number;
  name: string;
  solarSystemID: number;
  security: number;
  entry: StargateSummary;
  exit: StargateSummary;
  attackers: number;
} & Omit<StargateSummary, "stargateID">;

type FetchRouteResult = {
  jumps: number;
  route: SolarSystemSummary[];
};

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
  const areInputsValid =
    typeof originSolarSystemId === "number" &&
    typeof destinationSolarSystemId === "number";
  const avoidedSolarSystemsStr = avoidedSolarSystems.join(",");

  const {
    data = { jumps: 0, route: [] },
    error,
    isLoading,
    isValidating,
  } = useSWR<FetchRouteResult>(
    areInputsValid
      ? `/api/route?origin=${originSolarSystemId}&destination=${destinationSolarSystemId}&avoidSystems=${avoidedSolarSystemsStr}&avoidGateCamp=${avoidGateCamp}&avoidHics=${avoidHics}&avoidSmartBombs=${avoidSmartBombs}&avoidEntryGateCamp=${avoidEntryGateCamp}`
      : null,
    getEveTradePlus,
    {
      shouldRetryOnError: false,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      revalidateIfStale: false,
      refreshInterval: 3000,
    }
  );

  return {
    data,
    isLoading,
    isValidating,
    hasError: error,
  };
}

export default useFetchRoute;
export type { StargateSummary, SolarSystemSummary, FetchRouteResult };
