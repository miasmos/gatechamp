import useSWR from "swr";
import { getEveTradePlus } from "../api";

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
} & Omit<StargateSummary, "stargateID">;

type FetchRouteResult = {
  jumps: number;
  route: SolarSystemSummary[];
};

function useFetchRoute(
  originSolarSystemId: number | undefined,
  destinationSolarSystemId: number | undefined,
  avoidedSolarSystems: number[] = []
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
      ? `/api/route?origin=${originSolarSystemId}&destination=${destinationSolarSystemId}&avoidSystems=${avoidedSolarSystemsStr}`
      : null,
    getEveTradePlus,
    {
      shouldRetryOnError: false,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      revalidateIfStale: false,
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
