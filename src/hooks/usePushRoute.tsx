import useSWR from "swr";
import { post } from "../api";

function usePushRoute(
  solarSystemIds: number[],
  requestId: number | undefined,
  sendRequest: boolean
) {
  const areInputsValid =
    solarSystemIds.length > 0 && sendRequest && typeof requestId === "number";
  const {
    data = { jumps: 0, route: [] },
    error,
    isLoading,
    isValidating,
  } = useSWR<void>(
    areInputsValid ? `/api/route/push?id=${requestId}` : null,
    post({ ids: solarSystemIds }),
    {
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      revalidateIfStale: false,
      shouldRetryOnError: false,
    }
  );

  return {
    data,
    isLoading,
    isValidating,
    hasError: error,
  };
}

export default usePushRoute;
