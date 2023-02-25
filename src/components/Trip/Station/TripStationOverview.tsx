import { useRecoilValue, useSetRecoilState } from "recoil";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";
import Stack from "@mui/material/Stack";
import tripState from "../../../recoil/trip";
import shipsState from "../../../recoil/ships";
import useFetchTripStation from "../../../hooks/useFetchTripStation";
import TripStationOverviewListItem from "./TripStationOverviewListItem";
import tripDetailState from "../../../recoil/tripDetail";
import { NavigationIntention } from "../../../types";

type TripStationOverviewProps = NavigationIntention;

function TripStationOverview({ to }: TripStationOverviewProps) {
  const navigate = useNavigate();
  const trip = useRecoilValue(tripState);
  const ships = useRecoilValue(shipsState);
  const setTripDetail = useSetRecoilState(tripDetailState);
  const { data, isLoading, hasError } = useFetchTripStation(trip, ships);
  const onSelect = (index: number) => {
    setTripDetail({
      origin: data.origin,
      shipId: data.items[index].ship.id,
      ...data.items[index],
    });
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
      <Typography variant="h4" mb={5}>
        Choose your trip
      </Typography>
      <Stack spacing={2}>
        {data.items.map((node, index) => (
          <TripStationOverviewListItem
            key={index}
            trip={trip}
            origin={data.origin}
            onSelect={() => onSelect(index)}
            {...node}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default TripStationOverview;
