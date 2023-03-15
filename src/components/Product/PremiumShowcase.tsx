import { Box, Divider, Link, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { AppRoute } from "../../enum";
import useFetchSubscriptionProduct, {
  SubscriptionProductResponse,
} from "../../hooks/useFetchSubscriptionProduct";
import usePageTitle from "../../hooks/usePageTitle";
import checkoutState from "../../recoil/checkout/atom";
import productSetter from "../../recoil/checkout/setters/productSetter";
import { palette } from "../../theme";
import {
  centsToIsk,
  formatCurrency,
  savingsPercent,
} from "../../util/currency";
import MainButton from "../MainButton";
import Video from "../Video";

function PremiumShowcase() {
  const { data } = useFetchSubscriptionProduct();
  usePageTitle("Subscription");
  const setCheckoutState = useSetRecoilState(checkoutState);
  const setProduct = productSetter(setCheckoutState);
  const navigate = useNavigate();

  const goToCheckout = (
    product: SubscriptionProductResponse,
    priceIndex: number
  ) => {
    setProduct(product, priceIndex);
    navigate(`../${AppRoute.Checkout}`);
  };

  return (
    <Stack alignItems="center">
      <Stack alignItems="center" mb={18}>
        <Stack mb={7}>
          <Typography variant="h1" lineHeight={0.7}>
            Fly safe
          </Typography>
          <Typography variant="h5" fontSize="1.78rem">
            with GateChamp premium
          </Typography>
          <Typography mt={3}>
            GateChamp premium has a slew of features that offer both peace of
            mind and convenience.
          </Typography>
        </Stack>
        <Link href="#table">
          <MainButton>Subscribe Now</MainButton>
        </Link>
      </Stack>
      <Stack>
        <Typography variant="h3" mb={7}>
          Features
        </Typography>
        <Stack spacing={14}>
          <Stack>
            <Stack direction="row" width="100%" justifyContent="center">
              <Stack px={4} justifyContent="center">
                <Typography variant="h6" align="left">
                  Route charting
                </Typography>
                <Typography variant="body2" align="left">
                  Easily send routes to your Eve client.
                </Typography>
              </Stack>
              <Video
                src="/feature-1.webm"
                width={200}
                height={100}
                borderRadius={1}
                overflow="hidden"
              />
            </Stack>
            <Stack mt={4}>
              <Typography>No more double route management.</Typography>
              <Typography>
                Route charting allows you to take your current route on
                GateChamp and send it to your Eve client at the push of a
                button.
              </Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack>
            <Stack direction="row-reverse" width="100%" justifyContent="center">
              <Stack px={4} justifyContent="center">
                <Typography variant="h6" align="right">
                  Location tracking
                </Typography>
                <Typography variant="body2" align="right">
                  Follows you as you navigate New Eden.
                </Typography>
              </Stack>
              <Video
                src="/feature-2.mp4"
                width={200}
                height={100}
                borderRadius={1}
                overflow="hidden"
              />
            </Stack>
            <Stack mt={4}>
              <Typography>No more fuss.</Typography>
              <Typography>
                We will automatically update your route on GateChamp as your
                location changes.
              </Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack>
            <Stack direction="row" width="100%" justifyContent="center">
              <Stack px={4} justifyContent="center">
                <Typography variant="h6" align="left">
                  Notifications
                </Typography>
                <Typography variant="body2" align="left">
                  In-game warnings.
                </Typography>
              </Stack>
              <Video
                src="/feature-3.webm"
                width={200}
                height={100}
                borderRadius={1}
                overflow="hidden"
              />
            </Stack>
            <Stack mt={4}>
              <Typography>Never get caught off guard.</Typography>
              <Typography>
                We will send in-game mail to you when a new gate camp appears on
                your current route.
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      {data && (
        <Stack mt={20} id="table">
          <Stack direction="row" spacing={8}>
            <Stack p={5}>
              <Typography variant="h6">1 month</Typography>
              <Typography>
                {formatCurrency(centsToIsk(data.prices[0].unit_amount))} isk
              </Typography>
              <Typography>or</Typography>
              <Typography>${data.prices[0].unit_amount / 100}</Typography>
              <MainButton
                sx={{ width: 100, height: 50, mt: 3 }}
                size="small"
                onClick={() => goToCheckout(data, 0)}
              >
                Subscribe
              </MainButton>
            </Stack>
            <Stack
              sx={{ border: `1px solid ${palette.palette.primary.main}` }}
              p={5}
              position="relative"
            >
              <Box
                position="absolute"
                top={-10}
                right={-20}
                borderRadius={1}
                p={0.5}
                px={1}
                sx={{
                  transform: "rotate(20deg)",
                  background: palette.palette.primary.main,
                }}
              >
                <Typography
                  variant="body2"
                  color={palette.palette.background.paper}
                  mb={-0.7}
                >
                  {savingsPercent(
                    data.prices[2].unit_amount,
                    data.prices[0].unit_amount * data.prices[2].months
                  )}
                  %
                </Typography>
                <Typography
                  variant="body2"
                  color={palette.palette.background.paper}
                >
                  savings
                </Typography>
              </Box>
              <Typography variant="h6">
                {data.prices[2].months} months
              </Typography>
              <Typography>
                {formatCurrency(centsToIsk(data.prices[2].unit_amount))} isk
              </Typography>
              <Typography>or</Typography>
              <Typography>${data.prices[2].unit_amount / 100}</Typography>
              <MainButton
                variant="contained"
                sx={{ width: 100, height: 50, mt: 3 }}
                size="small"
                onClick={() => goToCheckout(data, 2)}
              >
                Subscribe
              </MainButton>
            </Stack>
            <Stack p={5} position="relative">
              <Box
                position="absolute"
                top={-10}
                right={-20}
                borderRadius={1}
                p={0.5}
                px={1}
                sx={{
                  transform: "rotate(20deg)",
                  background: palette.palette.primary.main,
                }}
              >
                <Typography
                  variant="body2"
                  color={palette.palette.background.paper}
                  mb={-0.7}
                >
                  {savingsPercent(
                    data.prices[1].unit_amount,
                    data.prices[0].unit_amount * data.prices[1].months
                  )}
                  %
                </Typography>
                <Typography
                  variant="body2"
                  color={palette.palette.background.paper}
                >
                  savings
                </Typography>
              </Box>
              <Typography variant="h6">
                {data.prices[1].months} months
              </Typography>
              <Typography>
                {formatCurrency(centsToIsk(data.prices[1].unit_amount))} isk
              </Typography>
              <Typography>or</Typography>
              <Typography>${data.prices[1].unit_amount / 100}</Typography>
              <MainButton
                sx={{ width: 100, height: 50, mt: 3 }}
                size="small"
                onClick={() => goToCheckout(data, 1)}
              >
                Subscribe
              </MainButton>
            </Stack>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}

export default PremiumShowcase;
