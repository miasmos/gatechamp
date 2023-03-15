import { Stack } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  isCheckoutValidSelector,
  priceSelector,
  productQuantitySelector,
} from "../../recoil/checkout";
import { isSubscribedSelector } from "../../recoil/user";
import OrderSummary from "./OrderSummary";
import CheckoutFormStripe from "./stripe/CheckoutFormStripe";

function CheckoutPay() {
  const price = useRecoilValue(priceSelector);
  const quantity = useRecoilValue(productQuantitySelector);
  const isCheckoutValid = useRecoilValue(isCheckoutValidSelector);
  const isSubscribed = useRecoilValue(isSubscribedSelector);

  if (isSubscribed) {
    return <Navigate to="../.." />;
  }

  if (!isCheckoutValid) {
    return <Navigate to=".." />;
  }

  return (
    <Stack
      direction="row"
      justifyContent="center"
      width="100%"
      alignItems="center"
      spacing={20}
    >
      <Stack width={300}>
        <CheckoutFormStripe priceId={price!.price_id} quantity={quantity} />
      </Stack>
      <OrderSummary />
    </Stack>
  );
}

export default CheckoutPay;
