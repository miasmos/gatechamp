import useSWRImmutable from "swr/immutable";
import { get } from "../api";

type SubscriptionProductResponse = {
  product_id: string;
  product_name: string;
  prices: {
    price_id: string | undefined;
    unit_amount: number;
    months: number;
  }[];
};

function useFetchSubscriptionProduct(shouldFetch: boolean = true) {
  const {
    data = undefined,
    error,
    isLoading,
    isValidating,
  } = useSWRImmutable<SubscriptionProductResponse>(
    shouldFetch ? `/v1/product/subscription` : null,
    get
  );

  return { data, isLoading, isValidating, hasError: error };
}

export default useFetchSubscriptionProduct;
export type { SubscriptionProductResponse };
