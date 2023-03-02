import AutocompleteSolarSystem from "../AutocompleteSolarSystem";
import { Stack, Typography, Checkbox } from "@mui/material";
import { SolarSystem } from "../../types";
import useFetchRoute from "../../hooks/useFetchRoute";
import RouteRenderer from "./RouteRenderer";
import { useRecoilValue, useSetRecoilState } from "recoil";
import routeState from "../../recoil/route/atom";
import {
  avoidEntryGateCampSetter,
  avoidGateCampSetter,
  avoidHicsSetter,
  avoidSmartBombsSetter,
  destinationSetter,
  originSetter,
} from "../../recoil/route";

function RouteForm() {
  const setRouteState = useSetRecoilState(routeState);
  const {
    origin,
    destination,
    avoidedSolarSystems,
    avoidGateCamp,
    avoidEntryGateCamp,
    avoidHics,
    avoidSmartBombs,
  } = useRecoilValue(routeState);

  const { data, isLoading, isValidating } = useFetchRoute(
    origin,
    destination,
    avoidedSolarSystems.map((data) => data.solarSystemID),
    { avoidGateCamp, avoidHics, avoidSmartBombs, avoidEntryGateCamp }
  );

  const onOriginChange = (solarSystem: SolarSystem) =>
    originSetter(setRouteState)(solarSystem.solarSystemID);
  const onDestinationChange = (solarSystem: SolarSystem) =>
    destinationSetter(setRouteState)(solarSystem.solarSystemID);
  const onAvoidGateCamp = (value: boolean) =>
    avoidGateCampSetter(setRouteState)(value);
  const onAvoidEntryGateCamp = (value: boolean) =>
    avoidEntryGateCampSetter(setRouteState)(value);
  const onAvoidHics = (value: boolean) => avoidHicsSetter(setRouteState)(value);
  const onAvoidSmartBombs = (value: boolean) =>
    avoidSmartBombsSetter(setRouteState)(value);

  return (
    <Stack>
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
              <AutocompleteSolarSystem onChange={onOriginChange} />
            </Stack>
            <Stack>
              <Typography>Destination</Typography>
              <AutocompleteSolarSystem onChange={onDestinationChange} />
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="center" spacing={5}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ width: 120 }}>Avoid Gate Camp</Typography>
              <Checkbox
                checked={avoidGateCamp}
                onChange={(event) => onAvoidGateCamp(event.target.checked)}
              />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ width: 120 }}>Avoid Entry Gate Camp</Typography>
              <Checkbox
                checked={avoidEntryGateCamp}
                onChange={(event) => onAvoidEntryGateCamp(event.target.checked)}
              />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ width: 120 }}>
                Avoid Heavy Interdiction Cruisers
              </Typography>
              <Checkbox
                checked={avoidHics}
                onChange={(event) => onAvoidHics(event.target.checked)}
              />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ width: 120 }}>Avoid Smart Bombs</Typography>
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
