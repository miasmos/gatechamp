import { Stack } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { PaymentProvider } from "../../enum";
import {
  isCheckoutValidSelector,
  priceSelector,
  productQuantitySelector,
  providerSelector,
} from "../../recoil/checkout";
import { isSubscribedSelector } from "../../recoil/user";
import CheckoutFormCcp from "./ccp/CheckoutFormCcp";
import OrderSummary from "./OrderSummary";
import CheckoutFormStripe from "./stripe/CheckoutFormStripe";

function CheckoutPay() {
  const price = useRecoilValue(priceSelector);
  const provider = useRecoilValue(providerSelector);
  const quantity = useRecoilValue(productQuantitySelector);
  const isCheckoutValid = useRecoilValue(isCheckoutValidSelector);
  const isSubscribed = useRecoilValue(isSubscribedSelector);

  if (isSubscribed) {
    return <Navigate to="../.." />;
  }

  if (!isCheckoutValid) {
    return <Navigate to=".." />;
  }

  let checkoutForm;
  switch (provider) {
    case PaymentProvider.Stripe:
      checkoutForm = (
        <CheckoutFormStripe priceId={price!.price_id} quantity={quantity} />
      );
      break;
    case PaymentProvider.Ccp:
      checkoutForm = (
        <CheckoutFormCcp
          priceId={price!.price_id}
          quantity={quantity}
          unitAmount={price!.unit_amount}
        />
      );
      break;
  }

  return (
    <Stack
      direction="row"
      justifyContent="center"
      width="100%"
      alignItems="center"
      spacing={15}
    >
      <Stack width={300}>{checkoutForm}</Stack>
      <OrderSummary />
    </Stack>
  );
}

export default CheckoutPay;
