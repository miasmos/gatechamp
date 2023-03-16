import { Stack, Typography, Divider } from "@mui/material";
import { useRecoilValue } from "recoil";
import { PaymentProvider } from "../../enum";
import { priceSelector } from "../../recoil/checkout";
import checkoutState from "../../recoil/checkout/atom";
import { palette } from "../../theme";
import { centsToIsk, formatCurrency, getSymbol } from "../../util/currency";
import MainButton from "../MainButton";
import ProgressCircle from "../ProgressCircle";

type OrderSummaryProps = {
  action?: string;
  onActionClick?: () => void;
};

function OrderSummary({ action, onActionClick }: OrderSummaryProps) {
  const { productQuantity, provider } = useRecoilValue(checkoutState);
  const price = useRecoilValue(priceSelector);

  let basePrice, totalPrice;
  const symbol = getSymbol(provider!);
  switch (provider) {
    case PaymentProvider.Stripe:
      basePrice = price!.unit_amount / 100;
      totalPrice = (basePrice * productQuantity).toString();
      break;
    case PaymentProvider.Ccp:
      basePrice = centsToIsk(price!.unit_amount);
      totalPrice = formatCurrency(basePrice * productQuantity, 1);
      break;
  }

  return (
    <Stack
      sx={{ border: `1px solid ${palette.palette.primary.main}` }}
      p={4}
      textAlign="left"
    >
      <Typography variant="h5" mb={4}>
        Order summary
      </Typography>
      <Stack direction="row" justifyContent="space-between" mb={4}>
        <Typography>Items ({productQuantity}):</Typography>&nbsp;
        <Typography>
          {symbol}
          {totalPrice}
        </Typography>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Stack direction="row" justifyContent="space-between">
        <Typography fontWeight="bold">Total</Typography>
        <Typography fontWeight="bold">
          {symbol}
          {totalPrice}
        </Typography>
      </Stack>
      {action && onActionClick && (
        <MainButton sx={{ mt: 2 }} variant="contained" onClick={onActionClick}>
          {action}
        </MainButton>
      )}
    </Stack>
  );
}

export default OrderSummary;
