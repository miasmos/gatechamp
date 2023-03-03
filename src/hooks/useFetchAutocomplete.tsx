import useSWR from "swr/immutable";
import { getEveTradePlus } from "../api";

enum AutocompleteType {
  SolarSystem = "solar-system",
  Ship = "ship",
}

type ElasticSearchHit<T> = {
  _index: string;
  _id: string;
  _score: number;
  _source: T;
};

type ElasticSearchResult<T> = {
  took: number;
  timed_out: boolean;
  hits: {
    total: {
      value: number;
      relation: string;
    };
    max_score: number;
    hits: ElasticSearchHit<T>[];
  };
};

function useFetchAutocomplete<T>(
  name: string = "",
  type: AutocompleteType = AutocompleteType.SolarSystem
) {
  const areInputsValid = name.length > 0;
  const {
    data = { hits: { hits: [] } },
    error,
    isLoading,
    isValidating,
  } = useSWR<ElasticSearchResult<T>>(
    areInputsValid ? `/api/autocomplete/${type}?name=${name}` : null,
    getEveTradePlus,
    {
      shouldRetryOnError: true,
    }
  );

  return {
    data: data as ElasticSearchResult<T>,
    isLoading,
    isValidating,
    hasError: error,
  };
}

export default useFetchAutocomplete;
export { AutocompleteType };
export type { ElasticSearchResult, ElasticSearchHit };
