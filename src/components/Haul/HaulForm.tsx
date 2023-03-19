import AutocompleteSolarSystem from "../AutocompleteSolarSystem";
import {
  Checkbox,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { EveSolarSystem } from "../../types";
import RouteRenderer from "../Route/RouteRenderer";
import { useRecoilValue, useSetRecoilState } from "recoil";
import routeState from "../../recoil/route/atom";
import {
  avoidEntryGateCampSetter,
  avoidGateCampSetter,
  avoidHicsSetter,
  avoidSmartBombsSetter,
  destinationNameSetter,
  destinationSetter,
  originNameSetter,
  originSetter,
} from "../../recoil/route";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import usePageTitle from "../../hooks/usePageTitle";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { palette } from "../../theme";
import { formatCurrency } from "../../util/currency";
import { calculateHaulerReward } from "../../util/eve";
import { addDays, addHours, isBefore } from "date-fns";

function HaulForm() {
  const [{ collateral, volume, deliverBy }, setState] = useState<{
    collateral: string;
    volume: string;
    deliverBy: Date | null;
  }>({
    collateral: "0",
    volume: "1",
    deliverBy: addHours(new Date(), 1),
  });
  const {
    originName,
    origin,
    destinationName,
    destination,
    jumps,
    hasLowSecurity,
    hasNullSecurity,
  } = useRecoilValue(routeState);
  const setRouteState = useSetRecoilState(routeState);
  const theme = useTheme();
  usePageTitle("Hauler Calculator");
  const setDestinationName = destinationNameSetter(setRouteState);
  const setOriginName = originNameSetter(setRouteState);

  const onOriginChange = (solarSystem: EveSolarSystem) =>
    originSetter(setRouteState)(solarSystem.solarSystemID);
  const onOriginNameChange = (
    _: SyntheticEvent<Element, Event>,
    nextValue: string
  ) => setOriginName(nextValue);
  const onDestinationChange = (solarSystem: EveSolarSystem) =>
    destinationSetter(setRouteState)(solarSystem.solarSystemID);
  const onDestinationNameChange = (
    _: SyntheticEvent<Element, Event>,
    nextValue: string
  ) => setDestinationName(nextValue);
  const setCollateral = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setState((state) => ({ ...state, collateral: event.target.value }));
  const setVolume = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setState((state) => ({ ...state, volume: event.target.value }));
  const onDeliverByChange = (value: Date | null) =>
    setState((state) => ({ ...state, deliverBy: value }));

  useEffect(() => {
    avoidGateCampSetter(setRouteState)(false);
    avoidEntryGateCampSetter(setRouteState)(false);
    avoidHicsSetter(setRouteState)(false);
    avoidSmartBombsSetter(setRouteState)(false);
  }, []);

  const collateralNumeric = Number(collateral);
  const volumeNumeric = Number(volume);
  const isFormValid =
    !Number.isNaN(collateralNumeric) &&
    collateralNumeric >= 100000 &&
    !Number.isNaN(volumeNumeric) &&
    volumeNumeric > 0 &&
    Boolean(deliverBy) &&
    typeof origin === "number" &&
    typeof destination === "number" &&
    jumps > 1;
  const hasRushDelivery =
    Boolean(deliverBy) && isBefore(deliverBy!, addDays(Date.now(), 1));
  const { isValid, reward, doesFit } = calculateHaulerReward(
    Number(collateral),
    Number(volume),
    jumps,
    hasRushDelivery,
    hasNullSecurity || hasLowSecurity
  );

  return (
    <Stack width="100%">
      <Typography variant="h3">Hauler Calculator</Typography>
      <Stack direction="column" spacing={3} pt={4}>
        <Stack direction="column">
          <Stack
            className="route-form__inputs"
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={{ md: 3, sm: 0 }}
            mb={2}
            sx={{
              [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
                "> *": { my: theme.spacing(1) },
              },
            }}
          >
            <Stack direction="row" spacing={10}>
              <Stack
                direction="column"
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Typography>Origin</Typography>
                <AutocompleteSolarSystem
                  controlled
                  onChange={onOriginChange}
                  onInputChange={onOriginNameChange}
                  value={originName}
                />
              </Stack>
              <Stack
                direction="column"
                spacing={{ md: 2, sm: 0 }}
                alignItems="center"
                justifyContent="center"
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    flexDirection: "row-reverse",
                    "> *": {
                      mx: theme.spacing(1),
                    },
                  },
                }}
              >
                <Typography>Destination</Typography>
                <AutocompleteSolarSystem
                  controlled
                  onChange={onDestinationChange}
                  onInputChange={onDestinationNameChange}
                  value={destinationName}
                />
              </Stack>
            </Stack>
            <Stack direction="row" spacing={3}>
              {/* collateral */}
              <Stack direction="row" spacing={3}>
                <Stack direction="row" alignItems="center">
                  <Typography textAlign="right" whiteSpace="nowrap">
                    Collateral
                  </Typography>
                </Stack>
                <TextField
                  onChange={setCollateral}
                  value={collateral}
                  type="number"
                  sx={{ width: 150 }}
                  error={!isValid}
                />
              </Stack>
              {/* volume m3 */}
              <Stack direction="row" spacing={3}>
                <Stack direction="row" alignItems="center">
                  <Typography textAlign="right" whiteSpace="nowrap">
                    Volume (m³)
                  </Typography>
                </Stack>
                <TextField
                  onChange={setVolume}
                  value={volume}
                  type="number"
                  sx={{ width: 150 }}
                  error={!isValid}
                />
              </Stack>
              <Stack direction="row" spacing={3}>
                <Stack direction="row" alignItems="center">
                  <Typography textAlign="right" whiteSpace="nowrap">
                    Deliver by
                  </Typography>
                </Stack>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    value={deliverBy}
                    onChange={onDeliverByChange}
                    disablePast
                    sx={{
                      width: 260,
                      ".MuiInputAdornment-root": {
                        ".MuiSvgIcon-root": {
                          color: palette.palette.primary.main,
                        },
                        ".MuiIconButton-root:hover": {
                          background: "none",
                        },
                        ".MuiTouchRipple-root": {
                          display: "none",
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </Stack>
            </Stack>
          </Stack>
          <RouteRenderer
            alwaysShowDestination
            alwaysShowOrigin
            canAvoid={false}
          />

          <Stack mt={5} minHeight={88}>
            {isFormValid && (
              <>
                <Typography variant="h5">Expected Reward</Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  {doesFit ? (
                    <>
                      <Typography variant="h5" mt={0.6} ml={-1}>
                        Ƶ
                      </Typography>
                      <Typography variant="h3">
                        {formatCurrency(reward!)}
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="h3">Does not fit</Typography>
                  )}
                </Stack>
              </>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default HaulForm;
