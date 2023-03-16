import { PaymentProvider } from "../../../enum";
import useFetchCreatePayment from "../../../hooks/useFetchCreatePayment";
import CheckoutFormStripeElement from "./CheckoutFormStripeElement";
import StripeContainer from "./StripeContainer";

type CheckoutFormStripeProps = {
  priceId: string | undefined;
  quantity?: number;
};

function CheckoutFormStripe({
  priceId,
  quantity = 1,
}: CheckoutFormStripeProps) {
  const {
    data: { clientSecret, subscriptionId },
  } = useFetchCreatePayment(priceId, quantity, PaymentProvider.Stripe);

  return (
    <StripeContainer clientSecret={clientSecret}>
      <CheckoutFormStripeElement />
    </StripeContainer>
  );
}

export default CheckoutFormStripe;
