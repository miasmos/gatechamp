import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import tripState, { clearTripSetter } from "../../../recoil/trip";
import shipsState from "../../../recoil/ships/atom";
import { NavigationIntention } from "../../../types";
import useFetchTripStation from "../../../hooks/useFetchTripStation";
import TripStationResultShip from "./TripStationResultShip";

type TripStationResults = NavigationIntention;

function TripStationResults({ to }: TripStationResults) {
  const navigate = useNavigate();
  const [trip, setTripState] = useRecoilState(tripState);
  const ships = useRecoilValue(shipsState);
  const clearTrip = clearTripSetter(setTripState);
  const { data, isLoading, hasError } = useFetchTripStation(trip, ships);

  // TODO: remove any here
  const origin = useMemo(
    () =>
      data.find((record: any) => {
        return record?.location.station_id.toString() === trip.from;
      })?.location || {
        name: "",
        station_id: 0,
        rating: 0,
        system_id: 0,
      },
    [data]
  );

  const onReset = () => {
    clearTrip();
    navigate(to);
  };

  if (hasError) {
    console.log("error while fetching", hasError);
  }
  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <Stack spacing={5}>
      <Stack>
        {data.map((node, index) => (
          <TripStationResultShip
            key={index}
            trip={trip}
            origin={origin}
            {...node}
          />
        ))}
      </Stack>
      <Button sx={{ height: 60 }} variant="contained" onClick={onReset}>
        Reset
      </Button>
    </Stack>
  );
}

export default TripStationResults;
