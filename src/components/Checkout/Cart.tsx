import {
  Stack,
  Typography,
  Divider,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { AppRoute, PaymentProvider } from "../../enum";
import { priceSelector, productQuantitySetter } from "../../recoil/checkout";
import checkoutState from "../../recoil/checkout/atom";
import { centsToIsk, formatCurrency, getSymbol } from "../../util/currency";
import MainButton from "../MainButton";
import OrderSummary from "./OrderSummary";

function Cart() {
  const navigate = useNavigate();
  const [{ productQuantity, provider }, setCheckoutState] =
    useRecoilState(checkoutState);
  const setproductQuantity = productQuantitySetter(setCheckoutState);
  const price = useRecoilValue(priceSelector);

  const onproductQuantityChange = (event: SelectChangeEvent<number>) =>
    setproductQuantity(Number(event.target.value));
  const onCheckoutClick = () => navigate(`../${AppRoute.Pay}`);

  if (!price || !provider) {
    return <Navigate to={`..`} />;
  }

  let basePrice, itemPrice;
  const symbol = getSymbol(provider);
  switch (provider) {
    case PaymentProvider.Stripe:
      basePrice = price!.unit_amount / 100;
      itemPrice = basePrice;
      break;
    case PaymentProvider.Ccp:
      basePrice = centsToIsk(price!.unit_amount);
      itemPrice = formatCurrency(basePrice);
      break;
  }

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      width="100%"
      spacing={10}
      sx={{ textAlign: "left" }}
    >
      <Stack flex={1} py={4}>
        <Typography variant="h5">Cart</Typography>
        <Divider sx={{ mt: 2, mb: 3 }} />
        <Stack direction="row" justifyContent="space-between">
          <Stack>
            <Stack direction="row">
              <Select
                value={productQuantity}
                onChange={onproductQuantityChange}
                size="small"
                sx={{ width: 60 }}
              >
                {[1, 2, 3, 4, 5, 6].map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
              <Stack alignItems="center" direction="row" ml={2}>
                <Typography>{price!.months}-month Subscription</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack alignItems="center" direction="row">
            <Typography>
              {symbol}
              {itemPrice}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <OrderSummary action="Checkout" onActionClick={onCheckoutClick} />
    </Stack>
  );
}

export default Cart;
