import { useRecoilValue, useSetRecoilState } from "recoil";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";
import Stack from "@mui/material/Stack";
import tripState from "../../../recoil/trip";
import shipsState from "../../../recoil/ships";
import useFetchTripStation from "../../../hooks/useFetchTripStation";
import TripStationOverviewListItem from "./TripStationOverviewListItem";
import { NavigationIntention } from "../../../types";

type TripStationOverviewProps = NavigationIntention;

function TripStationOverview({ to }: TripStationOverviewProps) {
  const navigate = useNavigate();
  const trip = useRecoilValue(tripState);
  const ships = useRecoilValue(shipsState);
  const { data, isLoading, hasError } = useFetchTripStation(trip, ships);
  const onSelect = (index: number) => {
    navigate(to, {
      state: {
        origin: data.origin,
        shipId: data.items[index].ship.id,
        ...data.items[index],
      },
    });
  };

  if (hasError) {
    console.log("error while fetching", hasError);
  }
  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <Stack spacing={5}>
      <Typography variant="h4">Choose your trip</Typography>
      <Stack
        spacing={2}
        maxHeight={420}
        px={2}
        py={2}
        sx={{ overflowY: "scroll" }}
      >
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
