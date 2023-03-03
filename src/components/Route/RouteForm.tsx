import AutocompleteSolarSystem from "../AutocompleteSolarSystem";
import { Stack, Typography, Checkbox } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
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
  originNameSetter,
  originSetter,
} from "../../recoil/route";
import { SyntheticEvent } from "react";

function RouteForm() {
  const setRouteState = useSetRecoilState(routeState);
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
  const setDestination = destinationSetter(setRouteState);
  const setOrigin = originSetter(setRouteState);
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
  const onAvoidGateCamp = (value: boolean) =>
    avoidGateCampSetter(setRouteState)(value);
  const onAvoidEntryGateCamp = (value: boolean) =>
    avoidEntryGateCampSetter(setRouteState)(value);
  const onAvoidHics = (value: boolean) => avoidHicsSetter(setRouteState)(value);
  const onAvoidSmartBombs = (value: boolean) =>
    avoidSmartBombsSetter(setRouteState)(value);
  const onSwap = () => {
    setDestinationName(originName);
    setOriginName(destinationName);

    if (origin) {
      setDestination(origin);
    }
    if (destination) {
      setOrigin(destination);
    }
  };

  return (
    <Stack mt={5}>
      <Stack direction="column" spacing={3}>
        <Stack direction="column">
          <Stack
            direction="row"
            alignItems="center"
            spacing={3}
            justifyContent="center"
            mb={2}
          >
            <Stack>
              <Typography>Origin</Typography>
              <AutocompleteSolarSystem
                controlled
                onChange={onOriginChange}
                onInputChange={onOriginNameChange}
                value={originName}
              />
            </Stack>
            <Stack onClick={onSwap}>
              <SwapHorizIcon sx={{ mt: 2, cursor: "pointer" }} />
            </Stack>
            <Stack>
              <Typography>Destination</Typography>
              <AutocompleteSolarSystem
                controlled
                onChange={onDestinationChange}
                onInputChange={onDestinationNameChange}
                value={destinationName}
              />
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
        <RouteRenderer width={800} alwaysShowDestination alwaysShowOrigin />
      </Stack>
    </Stack>
  );
}

export default RouteForm;
