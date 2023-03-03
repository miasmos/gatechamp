import useSWRImmutable from "swr/immutable";
import { getEveTradePlus } from "../api";
import { EveSolarSystem } from "../types";

function useFetchSolarSystem(solarSystemId: number) {
  const {
    data = [],
    error,
    isLoading,
    isValidating,
  } = useSWRImmutable<EveSolarSystem>(
    `/api/solar-system?ids=${solarSystemId}`,
    getEveTradePlus,
    {
      shouldRetryOnError: true,
    }
  );

  return {
    data,
    isLoading,
    isValidating,
    hasError: error,
  };
}

export default useFetchSolarSystem;
