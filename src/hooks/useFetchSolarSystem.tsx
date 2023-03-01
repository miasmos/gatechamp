import useSWRImmutable from "swr/immutable";
import { getEveTradePlus } from "../api";
import { SolarSystem } from "../types";

function useFetchSolarSystem(solarSystemId: number) {
  const {
    data = [],
    error,
    isLoading,
    isValidating,
  } = useSWRImmutable<SolarSystem>(
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
