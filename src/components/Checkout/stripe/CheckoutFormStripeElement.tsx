import { Stack } from "@mui/material";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { APP_DOMAIN } from "../../../constants";
import { AppRoute, PaymentProvider } from "../../../enum";
import MainButton from "../../MainButton";

function CheckoutFormStripeElement() {
  const [didClickSubmit, setDidClickSubmit] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();
  const canSubmit = stripe && elements;

  const onSubmit = () => {
    if (!canSubmit) {
      return;
    }
    setDidClickSubmit(true);
    (async () => {
      await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${APP_DOMAIN}/${AppRoute.Checkout}/${AppRoute.Status}?provider=${PaymentProvider.Stripe}`,
        },
      });
    })();
  };

  return (
    <Stack>
      <PaymentElement />
      <img src="/stripe-badge-transparent.png" />

      <Stack alignItems="center" mt={4}>
        <MainButton
          onClick={onSubmit}
          disabled={!canSubmit || didClickSubmit}
          variant="contained"
        >
          Pay
        </MainButton>
      </Stack>
    </Stack>
  );
}

export default CheckoutFormStripeElement;
