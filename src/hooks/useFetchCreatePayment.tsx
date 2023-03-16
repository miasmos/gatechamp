import useSWRImmutable from "swr/immutable";
import { post } from "../api";
import { PaymentProvider } from "../enum";

type CreatePaymentResponse = {
  subscriptionId: string;
  clientSecret: string;
};

function useFetchCreatePayment(
  priceId: string,
  quantity: number,
  provider: PaymentProvider
) {
  const {
    data = { subscriptionId: undefined, clientSecret: undefined },
    error,
    isLoading,
    isValidating,
  } = useSWRImmutable<CreatePaymentResponse>(
    `/api/payment/create`,
    post({ priceId, quantity, provider }),
    { shouldRetryOnError: false }
  );

  return { data, isLoading, isValidating, hasError: error };
}

export default useFetchCreatePayment;
