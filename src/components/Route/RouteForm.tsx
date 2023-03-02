import AutocompleteSolarSystem from "../AutocompleteSolarSystem";
import { Stack, Typography, Chip } from "@mui/material";
import { SolarSystem } from "../../types";
import useFetchRoute from "../../hooks/useFetchRoute";
import RouteRenderer from "./RouteRenderer";
import { useRecoilState, useSetRecoilState } from "recoil";
import routeState from "../../recoil/route/atom";
import {
  addAvoidSystemSetter,
  deleteAvoidSystemSetter,
  destinationSetter,
  originSetter,
} from "../../recoil/route";

function RouteForm() {
  const setRouteState = useSetRecoilState(routeState);
  const [{ origin, destination, avoidedSolarSystems }] =
    useRecoilState(routeState);

  const { data, isLoading, isValidating } = useFetchRoute(
    origin,
    destination,
    avoidedSolarSystems.map((data) => data.solarSystemID)
  );

  const onOriginChange = (solarSystem: SolarSystem) =>
    originSetter(setRouteState)(solarSystem.solarSystemID);
  const onDestinationChange = (solarSystem: SolarSystem) =>
    destinationSetter(setRouteState)(solarSystem.solarSystemID);
  const onAvoidSolarSystem = (solarSystemID: number, name: string) =>
    addAvoidSystemSetter(setRouteState)({ solarSystemID, name });
  const onUnavoidSolarSystem = (index: number) =>
    deleteAvoidSystemSetter(setRouteState)(index);

  if (data) {
    console.log(data);
  }

  return (
    <Stack>
      <Stack direction="row" spacing={3} mb={5} justifyContent="center">
        <Stack>
          <Typography>Origin</Typography>
          <AutocompleteSolarSystem onChange={onOriginChange} />
        </Stack>
        <Stack>
          <Typography>Destination</Typography>
          <AutocompleteSolarSystem onChange={onDestinationChange} />
        </Stack>
      </Stack>
      <Stack alignItems="flex-start" direction="row" spacing={2}>
        {avoidedSolarSystems.map(({ name }, index) => (
          <Chip label={name} onDelete={() => onUnavoidSolarSystem(index)} />
        ))}
      </Stack>
      <RouteRenderer route={data} width={800} onAvoid={onAvoidSolarSystem} />
    </Stack>
  );
}

export default RouteForm;
