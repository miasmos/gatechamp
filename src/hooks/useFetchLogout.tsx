import useSWRImmutable from "swr/immutable";
import { get } from "../api";
import { EveSolarSystem } from "../types";

function useFetchLogout(shouldLogout: boolean = false) {
  const { error, isLoading, isValidating } = useSWRImmutable<EveSolarSystem>(
    shouldLogout ? `/v1/auth/logout` : null,
    get
  );

  return {
    isLoading,
    isValidating,
    hasError: error,
  };
}

export default useFetchLogout;
