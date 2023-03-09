import { useRecoilValue, useSetRecoilState } from "recoil";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";
import Stack from "@mui/material/Stack";
import tripState from "../../../recoil/trip";
import { getSelectedShipsSelector } from "../../../recoil/ships";
import useFetchTripStation from "../../../hooks/useFetchTripStation";
import TripStationOverviewListItem from "./TripStationOverviewListItem";
import { NavigationIntention } from "../../../types";
import routeState from "../../../recoil/route/atom";
import {
  clearRouteSetter,
  destinationSetter,
  originSetter,
} from "../../../recoil/route";
import { useEffect } from "react";
import LoadingAnimation from "../../LoadingAnimation";

type TripStationOverviewProps = NavigationIntention;

function TripStationOverview({ to }: TripStationOverviewProps) {
  const navigate = useNavigate();
  const setRouteState = useSetRecoilState(routeState);
  const trip = useRecoilValue(tripState);
  const selectedShips = useRecoilValue(getSelectedShipsSelector);
  const clearRoute = clearRouteSetter(setRouteState);
  const { data, isValidating, isLoading, hasError } = useFetchTripStation(
    trip.id,
    trip,
    selectedShips
  );
  const setRouteOrigin = (solarSystemID: number) =>
    originSetter(setRouteState)(solarSystemID);
  const setRouteDestination = (solarSystemID: number) =>
    destinationSetter(setRouteState)(solarSystemID);
  const onSelect = (index: number) => {
    const { origin, destination } = data[index];
    setRouteOrigin(origin.system_id);
    setRouteDestination(destination.system_id);
    navigate(to, {
      state: data[index],
    });
  };

  if (hasError) {
    console.log("error while fetching", hasError);
  }
  if (isLoading || isValidating) {
    return (
      <Stack direction="column" alignItems="center" justifyContent="center">
        <LoadingAnimation />
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Choose your trip</Typography>
      <Stack
        spacing={2}
        maxHeight={420}
        px={2}
        py={2}
        sx={{ overflowY: data.length > 4 ? "scroll" : "initial" }}
      >
        {data.map((node, index) => (
          <TripStationOverviewListItem
            key={index}
            trip={trip}
            onSelect={() => onSelect(index)}
            {...node}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default TripStationOverview;
