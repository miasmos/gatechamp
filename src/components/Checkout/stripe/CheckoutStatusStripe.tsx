import { Stack } from "@mui/material";
import { useStripe } from "@stripe/react-stripe-js";
import { PaymentIntent } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";
import CheckoutStatusState, { CheckoutStatus } from "../CheckoutStatusState";

type CheckoutStatusStripeProps = {
  clientSecret: string | undefined;
};

function CheckoutStatusStripe({ clientSecret }: CheckoutStatusStripeProps) {
  const [status, setStatus] = useState<PaymentIntent.Status | undefined>(
    undefined
  );
  const stripe = useStripe();
  const isStripeReady = stripe && clientSecret;

  let checkoutStatus: CheckoutStatus;
  switch (status) {
    case "succeeded":
      checkoutStatus = CheckoutStatus.Success;
      break;
    case "requires_payment_method":
      checkoutStatus = CheckoutStatus.Failure;
      break;
    default:
      checkoutStatus = CheckoutStatus.Waiting;
      break;
  }

  const fetchStatus = async () => {
    if (isStripeReady) {
      const result = await stripe?.retrievePaymentIntent(clientSecret);
      if (!result || !result.paymentIntent) {
        // failure state
      } else {
        const { paymentIntent } = result;
        setStatus(paymentIntent!.status);
      }
    }
  };

  useEffect(() => {
    fetchStatus();
  }, [stripe, clientSecret]);

  useInterval(
    fetchStatus,
    checkoutStatus === CheckoutStatus.Waiting ? 1000 : null
  );

  return <CheckoutStatusState status={checkoutStatus} />;
}

export default CheckoutStatusStripe;
