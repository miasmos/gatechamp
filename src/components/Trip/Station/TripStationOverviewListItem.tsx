import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/system/Stack";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {
  FetchTripStationResultItem,
  StationItem,
} from "../../../hooks/useFetchTripStation";
import { TripState } from "../../../recoil/trip";
import { getStationDisplayName } from "../../../util/eveTrade";
import { formatCurrency } from "../../../util/currency";

type TripStationOverviewListItemProps = {
  trip: TripState;
  origin: StationItem;
  onSelect: () => void;
} & FetchTripStationResultItem;

function TripStationOverviewListItem({
  ship,
  origin,
  location,
  totalProfit,
  onSelect,
}: TripStationOverviewListItemProps) {
  if (totalProfit === 0) {
    return null;
  }

  return (
    <Paper sx={{ minWidth: 500, cursor: "pointer" }} onClick={onSelect}>
      <Stack direction="row" px={6} py={4} justifyContent="space-between">
        <Stack direction="row">
          <Typography>{getStationDisplayName(origin)}</Typography>
          <ArrowRightAltIcon />
          <Typography>{getStationDisplayName(location)}</Typography>
        </Stack>
        <Stack>
          <Typography>{ship.name}</Typography>
        </Stack>
        <Stack>
          <Typography>Ƶ{formatCurrency(totalProfit)} profit</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default TripStationOverviewListItem;
