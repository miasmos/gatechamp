import { PaymentIntent } from "@stripe/stripe-js";
import useSWR from "swr";
import { get } from "../api";
import { PaymentProvider } from "../enum";

type PaymentStatusResponse = {
  provider: PaymentProvider;
  status: "active" | "incomplete";
  updated_at: Date;
};

function useFetchPaymentStatus(
  subscriptionId: string | undefined,
  uuid?: string
) {
  const {
    data = { provider: undefined, status: "processing", updated_at: undefined },
    error,
    isLoading,
    isValidating,
  } = useSWR<PaymentStatusResponse>(
    subscriptionId
      ? `/api/payment/status?id=${subscriptionId}&uuid=${uuid}`
      : null,
    get
  );

  return { data, isLoading, isValidating, hasError: error };
}

export default useFetchPaymentStatus;
