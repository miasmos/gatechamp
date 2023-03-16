import AutocompleteSolarSystem from "../AutocompleteSolarSystem";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PublishIcon from "@mui/icons-material/Publish";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { EveSolarSystem } from "../../types";
import RouteRenderer from "./RouteRenderer";
import { useRecoilValue, useSetRecoilState } from "recoil";
import routeState from "../../recoil/route/atom";
import {
  avoidEntryGateCampSetter,
  avoidGateCampSetter,
  avoidHicsSetter,
  avoidSmartBombsSetter,
  destinationNameSetter,
  destinationSetter,
  getPushRouteCooldownProgressSelector,
  getPushRouteProgressSelector,
  originNameSetter,
  originSetter,
} from "../../recoil/route";
import { SyntheticEvent } from "react";
import { isLoggedInSelector, isSubscribedSelector } from "../../recoil/user";
import useMyLocation from "../../hooks/useMyLocation";
import usePushRoute from "../../hooks/usePushRoute";
import Tooltip from "../Tooltip";
import Checkbox from "../Checkbox";
import ProgressIcon from "../ProgressIcon";
import usePageTitle from "../../hooks/usePageTitle";
import { subscribeModalSetter } from "../../recoil/modal";
import modalState, { ModalSubscribeFeature } from "../../recoil/modal/atom";

function RouteForm() {
  const theme = useTheme();
  usePageTitle();
  const {
    canUseMyLocation,
    isMyLocationAvailable,
    onUseMyLocation,
    isUsingMyLocation,
  } = useMyLocation();
  const setRouteState = useSetRecoilState(routeState);
  const setModalState = useSetRecoilState(modalState);
  const setSubscribeModal = subscribeModalSetter(setModalState);
  const {
    avoidGateCamp,
    avoidEntryGateCamp,
    avoidHics,
    avoidSmartBombs,
    origin,
    destination,
    originName,
    destinationName,
  } = useRecoilValue(routeState);
  const isSubscribed = useRecoilValue(isSubscribedSelector);
  const isLoggedIn = useRecoilValue(isLoggedInSelector);
  const pushRouteCooldownProgress = useRecoilValue(
    getPushRouteCooldownProgressSelector
  );
  const pushRouteProgress = useRecoilValue(getPushRouteProgressSelector);
  const setDestination = destinationSetter(setRouteState);
  const setOrigin = originSetter(setRouteState);
  const setDestinationName = destinationNameSetter(setRouteState);
  const setOriginName = originNameSetter(setRouteState);

  const { onPushRoute, canPushRoute } = usePushRoute();

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
  const onAvoidGateCamp = (value: boolean) =>
    avoidGateCampSetter(setRouteState)(value);
  const onAvoidEntryGateCamp = (value: boolean) =>
    avoidEntryGateCampSetter(setRouteState)(value);
  const onAvoidHics = (value: boolean) => avoidHicsSetter(setRouteState)(value);
  const onAvoidSmartBombs = (value: boolean) =>
    avoidSmartBombsSetter(setRouteState)(value);
  const onSwap = () => {
    if (isLoggedIn && isMyLocationAvailable) {
      return;
    }
    setDestinationName(originName);
    setOriginName(destinationName);

    if (origin) {
      setDestination(origin);
    }
    if (destination) {
      setOrigin(destination);
    }
  };
  const onUseMyLocationClicked = () => {
    if (isSubscribed) {
      onUseMyLocation(!isUsingMyLocation);
    } else {
      setSubscribeModal(true, ModalSubscribeFeature.LocationTracking);
    }
  };
  const onPushRouteClicked = () => {
    if (isSubscribed) {
      onPushRoute();
    } else {
      setSubscribeModal(true, ModalSubscribeFeature.RouteCharting);
    }
  };

  const canSwap =
    origin &&
    destination &&
    originName &&
    destinationName &&
    !isMyLocationAvailable;
  const LocationIcon = isMyLocationAvailable
    ? MyLocationIcon
    : LocationSearchingIcon;
  const isLocationIconEnabled = canUseMyLocation || !isSubscribed;

  return (
    <Stack width="100%">
      <Stack direction="column" spacing={3}>
        <Stack direction="column">
          <Stack
            className="route-form__inputs"
            direction="row"
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
            <Stack>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Stack spacing={0.5}>
                  <Typography>&nbsp;</Typography>
                  <Tooltip title="Use My Location">
                    <Stack>
                      <LocationIcon
                        sx={{
                          cursor: isLocationIconEnabled ? "pointer" : "default",
                          opacity: isLocationIconEnabled ? 1 : 0.4,
                          transition: "opacity 0.2s",
                          zIndex: 2,
                        }}
                        onClick={onUseMyLocationClicked}
                      />
                    </Stack>
                  </Tooltip>
                </Stack>
                <Stack spacing={0.5}>
                  <Typography>Origin</Typography>
                  <AutocompleteSolarSystem
                    controlled
                    onChange={onOriginChange}
                    onInputChange={onOriginNameChange}
                    value={originName}
                    disabled={isMyLocationAvailable}
                  />
                </Stack>
              </Stack>
            </Stack>
            <Stack onClick={onSwap}>
              <Tooltip title="Swap">
                <SwapHorizIcon
                  sx={{
                    mt: { md: 2.5, sm: 0 },
                    cursor: canSwap ? "pointer" : "default",
                    opacity: canSwap ? 1 : 0.4,
                    transition: "opacity 0.2s",
                    [theme.breakpoints.down("sm")]: {
                      ml: theme.spacing(5),
                    },
                  }}
                />
              </Tooltip>
            </Stack>
            <Stack
              direction="row"
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
              <Stack spacing={0.5}>
                <Typography>Destination</Typography>
                <AutocompleteSolarSystem
                  controlled
                  onChange={onDestinationChange}
                  onInputChange={onDestinationNameChange}
                  value={destinationName}
                />
              </Stack>
              <Stack spacing={0.5}>
                <Typography>&nbsp;</Typography>
                <Tooltip title="Push to Eve client">
                  <Box>
                    {isSubscribed ? (
                      <ProgressIcon
                        progress={pushRouteProgress}
                        cooldownProgress={pushRouteCooldownProgress}
                        isOnCooldown={pushRouteCooldownProgress > 0}
                        isInProgress={pushRouteProgress !== 1}
                        icon={PublishIcon}
                        onClick={onPushRouteClicked}
                        isUsable={canPushRoute}
                      />
                    ) : (
                      <PublishIcon
                        sx={{ mt: 1, cursor: "pointer" }}
                        onClick={onPushRouteClicked}
                      />
                    )}
                  </Box>
                </Tooltip>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="center" spacing={5} mt={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body2" sx={{ width: 120 }}>
                Avoid Gate Camp
              </Typography>
              <Checkbox
                checked={avoidGateCamp}
                onChange={(event) => onAvoidGateCamp(event.target.checked)}
              />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body2" sx={{ width: 120 }}>
                Avoid Entry Gate Camp
              </Typography>
              <Checkbox
                checked={avoidEntryGateCamp}
                onChange={(event) => onAvoidEntryGateCamp(event.target.checked)}
              />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body2" sx={{ width: 120 }}>
                Avoid Heavy Interdiction Cruisers
              </Typography>
              <Checkbox
                checked={avoidHics}
                onChange={(event) => onAvoidHics(event.target.checked)}
              />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body2" sx={{ width: 120 }}>
                Avoid Smart Bombs
              </Typography>
              <Checkbox
                checked={avoidSmartBombs}
                onChange={(event) => onAvoidSmartBombs(event.target.checked)}
              />
            </Stack>
          </Stack>
        </Stack>
        <RouteRenderer alwaysShowDestination alwaysShowOrigin />
      </Stack>
    </Stack>
  );
}

export default RouteForm;
