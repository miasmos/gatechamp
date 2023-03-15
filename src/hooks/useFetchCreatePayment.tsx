import useSWRImmutable from "swr/immutable";
import { post } from "../api";

type CreateOrderResponse = {
  subscriptionId: string;
  clientSecret: string;
};

function useFetchCreatePayment(priceId: string, quantity: number) {
  const {
    data = { subscriptionId: undefined, clientSecret: undefined },
    error,
    isLoading,
    isValidating,
  } = useSWRImmutable<CreateOrderResponse>(
    `/api/payment/create`,
    post({ priceId, quantity }),
    { shouldRetryOnError: false }
  );

  return { data, isLoading, isValidating, hasError: error };
}

export default useFetchCreatePayment;
