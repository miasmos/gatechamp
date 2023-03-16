import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { EVE_ADMIN_CHARACTER_NAME } from "../../../constants";
import { AppRoute, PaymentProvider } from "../../../enum";
import useFetchCreatePayment from "../../../hooks/useFetchCreatePayment";
import { fontFamily, palette } from "../../../theme";
import { centsToIsk, formatCurrency } from "../../../util/currency";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LoopIcon from "@mui/icons-material/Loop";
import ProgressTimer from "../../ProgressTimer";
import MainButton from "../../MainButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useInterval } from "usehooks-ts";

type CheckoutFormCcpProps = {
  quantity?: number;
  unitAmount: number;
  priceId: string;
};

function CheckoutFormCcp({
  priceId,
  unitAmount,
  quantity = 1,
}: CheckoutFormCcpProps) {
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const buttonDelay = 5000;
  const navigate = useNavigate();
  const {
    data: { clientSecret, subscriptionId },
  } = useFetchCreatePayment(priceId, quantity, PaymentProvider.Ccp);
  const iskPrice = centsToIsk(unitAmount) * quantity;
  const iskPriceFormatted = formatCurrency(
    centsToIsk(unitAmount) * quantity,
    1
  );

  const onSendClick = () =>
    navigate(
      `../${AppRoute.Status}?provider=${PaymentProvider.Ccp}&subscriptionId=${subscriptionId}`
    );

  useInterval(
    () => {
      if (timeElapsed >= buttonDelay) {
        setIsButtonEnabled(true);
      }
      setTimeElapsed(timeElapsed + 1000);
    },
    timeElapsed <= buttonDelay ? 1000 : null
  );

  return (
    <Stack position="relative" className="checkout__form-ccp">
      <Stack position="relative" zIndex={2}>
        <Typography>Send </Typography>
        <CopyToClipboard text={iskPrice.toString()}>
          <Stack
            direction="column"
            alignItems="center"
            sx={{
              cursor: "pointer",
              ":hover": { transform: "translate(-1px,-1px)" },
              ":active": { transform: "translate(1px,1px)" },
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography
                variant="h4"
                fontSize="1.7rem"
                fontFamily={fontFamily}
              >
                Ƶ{iskPriceFormatted} isk
              </Typography>
              <ContentCopyIcon />
            </Stack>
          </Stack>
        </CopyToClipboard>
        <Typography pt={1}>to</Typography>
        <CopyToClipboard text={EVE_ADMIN_CHARACTER_NAME}>
          <Stack
            direction="column"
            alignItems="center"
            sx={{
              cursor: "pointer",
              ":hover": { transform: "translate(-1px,-1px)" },
              ":active": { transform: "translate(1px,1px)" },
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography
                variant="h4"
                fontSize="1.7rem"
                fontFamily={fontFamily}
              >
                {EVE_ADMIN_CHARACTER_NAME}
              </Typography>
              <ContentCopyIcon />
            </Stack>
          </Stack>
        </CopyToClipboard>
      </Stack>
      <Stack mt={3} direction="column" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Typography>Waiting</Typography>
          <LoopIcon
            fontSize="small"
            sx={{
              "@keyframes loop": {
                "0%": {
                  transform: "rotate(360deg)",
                },
                "100%": {
                  transform: "rotate(0deg)",
                },
              },
              animation: "loop 0.7s infinite",
            }}
          />
        </Stack>
      </Stack>
      <Stack mt={6} alignItems="center">
        <MainButton
          variant="contained"
          sx={{ width: 120 }}
          onClick={onSendClick}
          disabled={!isButtonEnabled}
        >
          I sent it
        </MainButton>
      </Stack>
    </Stack>
  );
}

export default CheckoutFormCcp;
