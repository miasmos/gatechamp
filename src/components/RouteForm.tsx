import AutocompleteSolarSystem from "./AutocompleteSolarSystem";
import { Stack, Typography } from "@mui/material";
import { SolarSystem } from "../types";
import { useState } from "react";
import useFetchRoute from "../hooks/useFetchRoute";
import RouteRenderer from "./RouteRenderer";

function RouteForm() {
  const [{ origin, destination }, setState] = useState<{
    origin: number | undefined;
    destination: number | undefined;
  }>({ origin: undefined, destination: undefined });
  const { data, isLoading, isValidating } = useFetchRoute(origin, destination);

  const onOriginChange = (solarSystem: SolarSystem) =>
    setState((state) => ({
      ...state,
      origin: solarSystem.solarSystemID,
    }));
  const onDestinationChange = (solarSystem: SolarSystem) =>
    setState((state) => ({
      ...state,
      destination: solarSystem.solarSystemID,
    }));

  if (data) {
    console.log(data);
  }

  return (
    <Stack>
      <Stack direction="row" spacing={3} mb={5}>
        <Stack>
          <Typography>Origin</Typography>
          <AutocompleteSolarSystem onChange={onOriginChange} />
        </Stack>
        <Stack>
          <Typography>Destination</Typography>
          <AutocompleteSolarSystem onChange={onDestinationChange} />
        </Stack>
      </Stack>
      <RouteRenderer route={data} />
    </Stack>
  );
}

export default RouteForm;
