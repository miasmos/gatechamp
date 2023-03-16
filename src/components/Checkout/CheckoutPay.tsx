import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AppRoute, PaymentProvider } from "../../enum";
import {
  checkoutSetter,
  isCheckoutValidSelector,
  priceSelector,
  productQuantitySelector,
  providerSelector,
} from "../../recoil/checkout";
import checkoutState from "../../recoil/checkout/atom";
import { isLoggedInSelector, isSubscribedSelector } from "../../recoil/user";
import CheckoutFormCcp from "./ccp/CheckoutFormCcp";
import OrderSummary from "./OrderSummary";
import CheckoutFormStripe from "./stripe/CheckoutFormStripe";

function CheckoutPay() {
  const [invoiceId, setInvoiceId] = useState<string | undefined>(undefined);
  const [didCheckQuery, setDidCheckQuery] = useState<boolean>(false);
  const setCheckoutState = useSetRecoilState(checkoutState);
  const setCheckout = checkoutSetter(setCheckoutState);
  const price = useRecoilValue(priceSelector);
  const isLoggedIn = useRecoilValue(isLoggedInSelector);
  const provider = useRecoilValue(providerSelector);
  const quantity = useRecoilValue(productQuantitySelector);
  const isCheckoutValid = useRecoilValue(isCheckoutValidSelector);
  const isSubscribed = useRecoilValue(isSubscribedSelector);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const provider = params.get("provider") as PaymentProvider;
    const invoiceId = params.get("invoiceId");
    const quantity = params.get("quantity");
    const unitAmount = params.get("unitAmount");
    const isUsingQuery =
      Boolean(provider) &&
      Boolean(invoiceId) &&
      Boolean(unitAmount) &&
      !Number.isNaN(unitAmount);
    Boolean(quantity) && !Number.isNaN(quantity);

    if (isUsingQuery) {
      setCheckout({
        provider,
        priceIndex: 0,
        productQuantity: Number(quantity),
        product: {
          product_id: "",
          product_name: "",
          prices: [
            { price_id: undefined, unit_amount: Number(unitAmount), months: 1 },
          ],
        },
      });
      setInvoiceId(invoiceId!);
    }
    setDidCheckQuery(true);
  }, []);

  if (!isLoggedIn) {
    return (
      <Navigate
        to={`../../${AppRoute.Login}`}
        state={{
          to: `${AppRoute.Checkout}/${AppRoute.Pay}${document.location.search}`,
        }}
      />
    );
  }

  if (!didCheckQuery) {
    return null;
  }

  if (isSubscribed && !invoiceId) {
    return <Navigate to="../.." />;
  }

  if (!isCheckoutValid) {
    return <Navigate to=".." />;
  }

  let checkoutForm;
  switch (provider) {
    case PaymentProvider.Stripe:
      checkoutForm = (
        <CheckoutFormStripe priceId={price?.price_id} quantity={quantity} />
      );
      break;
    case PaymentProvider.Ccp:
      checkoutForm = (
        <CheckoutFormCcp
          priceId={price?.price_id}
          quantity={quantity}
          unitAmount={price!.unit_amount}
          invoiceId={invoiceId}
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
