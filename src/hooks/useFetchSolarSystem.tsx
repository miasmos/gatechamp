import useSWRImmutable from "swr/immutable";
import { get } from "../api";
import { EveSolarSystem } from "../types";

function useFetchSolarSystem(solarSystemId: number) {
  const {
    data = [],
    error,
    isLoading,
    isValidating,
  } = useSWRImmutable<EveSolarSystem>(
    `/api/solar-system?ids=${solarSystemId}`,
    get
  );

  return {
    data,
    isLoading,
    isValidating,
    hasError: error,
  };
}

export default useFetchSolarSystem;
