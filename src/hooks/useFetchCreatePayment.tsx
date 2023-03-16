import useSWRImmutable from "swr/immutable";
import { post } from "../api";
import { PaymentProvider } from "../enum";

type CreatePaymentResponse = {
  subscriptionId: string;
  clientSecret: string;
  invoiceId: string;
};

function useFetchCreatePayment(
  priceId: string | undefined,
  quantity: number,
  provider: PaymentProvider
) {
  const {
    data = {
      subscriptionId: undefined,
      clientSecret: undefined,
      invoiceId: undefined,
    },
    error,
    isLoading,
    isValidating,
  } = useSWRImmutable<CreatePaymentResponse>(
    priceId ? `/api/payment/create` : null,
    post({ priceId, quantity, provider }),
    { shouldRetryOnError: false }
  );

  return { data, isLoading, isValidating, hasError: error };
}

export default useFetchCreatePayment;
