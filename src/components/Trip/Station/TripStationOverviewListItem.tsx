import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/system/Stack";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {
  FetchTripStationResultItem,
  StationItem,
} from "../../../hooks/useFetchTripStation";
import { TripState } from "../../../recoil/trip";
import { getStationDisplayName } from "../../../util/eve";
import { formatCurrency } from "../../../util/currency";

type TripStationOverviewListItemProps = {
  trip: TripState;
  origin: StationItem;
  onSelect: () => void;
} & FetchTripStationResultItem;

function TripStationOverviewListItem({
  ship,
  origin,
  destination,
  totalProfit,
  totalCost,
  profitPerJump,
  totalVolume,
  onSelect,
}: TripStationOverviewListItemProps) {
  if (totalProfit === 0) {
    return null;
  }

  return (
    <Paper
      elevation={10}
      sx={{ minWidth: 350, cursor: "pointer" }}
      onClick={onSelect}
    >
      <Stack px={6} py={3}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row">
            <Typography variant="h5" textAlign="left">
              {getStationDisplayName(origin)}
            </Typography>
            <Stack direction="row" alignItems="center">
              &nbsp;
              <ArrowRightAltIcon />
              &nbsp;
            </Stack>
            <Typography variant="h5" textAlign="left">
              {getStationDisplayName(destination)}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography variant="h5" textAlign="right">
              Ƶ{formatCurrency(totalProfit)}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" justifyContent="space-between" mt={0.5}>
          <Stack>
            <Typography variant="body2" textAlign="left">
              {ship.name}
            </Typography>
          </Stack>
          <Stack>
            <Typography variant="body2" textAlign="right">
              Ƶ{formatCurrency(profitPerJump)} / jump
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default TripStationOverviewListItem;
