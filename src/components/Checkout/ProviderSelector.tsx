import { Stack, Typography } from "@mui/material";
import { palette } from "../../theme";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { AppRoute, PaymentProvider } from "../../enum";
import { useRecoilValue, useSetRecoilState } from "recoil";
import checkoutState from "../../recoil/checkout/atom";
import { providerSetter } from "../../recoil/checkout";
import { Navigate, useNavigate } from "react-router-dom";
import { isSubscribedSelector } from "../../recoil/user";

function ProviderSelector() {
  const navigate = useNavigate();
  const isSubscribed = useRecoilValue(isSubscribedSelector);
  const setCheckoutState = useSetRecoilState(checkoutState);
  const setProvider = providerSetter(setCheckoutState);

  const onProviderSelected = (provider: PaymentProvider) => {
    setProvider(provider);
    navigate(`../${AppRoute.Cart}`);
  };

  if (isSubscribed) {
    return <Navigate to="../.." />;
  }

  return (
    <Stack alignItems="center" width="100%">
      <Stack mb={8}>
        <Typography variant="h3">How will you be paying?</Typography>
      </Stack>
      <Stack direction="row" spacing={8}>
        <Stack
          borderRadius={4}
          p={10}
          sx={{
            border: `2px solid ${palette.palette.primary.main}`,
            cursor: "pointer",
          }}
          onClick={() => onProviderSelected(PaymentProvider.Stripe)}
        >
          <Stack width={86}>
            <Typography variant="h1">$</Typography>
            <Typography>Dollars</Typography>
            <Stack mt={4} direction="row" justifyContent="center">
              <AccessTimeIcon />
              <Stack direction="row" alignItems="center" ml={0.4}>
                <Typography variant="body2">Instant</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          borderRadius={4}
          p={10}
          sx={{
            border: `2px solid ${palette.palette.primary.main}`,
            cursor: "pointer",
          }}
          onClick={() => onProviderSelected(PaymentProvider.Ccp)}
        >
          <Stack width={86}>
            <Typography variant="h1">Ƶ</Typography>
            <Typography>Isk</Typography>
            <Stack mt={4} direction="row" justifyContent="center">
              <AccessTimeIcon />
              <Stack direction="row" alignItems="center" ml={0.4}>
                <Typography variant="body2">1hr</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ProviderSelector;
