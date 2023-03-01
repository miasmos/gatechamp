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
  destinationSolarSystemId: number | undefined
) {
  const areInputsValid =
    typeof originSolarSystemId === "number" &&
    typeof destinationSolarSystemId === "number";

  const {
    data = { jumps: 0, route: [] },
    error,
    isLoading,
    isValidating,
  } = useSWR<FetchRouteResult>(
    areInputsValid
      ? `/api/route?origin=${originSolarSystemId}&destination=${destinationSolarSystemId}`
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
