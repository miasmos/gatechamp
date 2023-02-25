import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import useFetchStation from "../../../hooks/useFetchStation";
import tripState, { clearTripSetter } from "../../../recoil/trip";
import { AppRoute } from "../../../enum";
import shipsState from "../../../recoil/ships/atom";
import TripStationResult from "./TripStationResult";

function TripStationResults() {
  const navigate = useNavigate();
  const [trip, setTripState] = useRecoilState(tripState);
  const ships = useRecoilValue(shipsState);
  const clearTrip = clearTripSetter(setTripState);
  const { items, hasError } = useFetchStation(trip);

  const onReset = () => {
    clearTrip();
    navigate(AppRoute.Home);
  };

  if (hasError) {
    console.log("error while fetching", hasError);
  }

  return (
    <Stack spacing={5}>
      <Stack>
        {ships.ships.map((ship) => (
          <TripStationResult
            key={ship.id}
            ship={ship}
            trip={trip}
            items={items}
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
