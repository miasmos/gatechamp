import { useState } from "react";
import Stack from "@mui/material/Stack";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Typography from "@mui/material/Typography";
import { TripState } from "../../../recoil/trip";
import { getStationDisplayName } from "../../../util/eveTrade";
import { CargoBay } from "../../../enum";
import {
  FetchTripStationResultItem,
  StationItem,
} from "../../../hooks/useFetchTripStation";
import TripStationItemTable from "./TripStationItemTable";
import { formatCurrency } from "../../../util/currency";

type TripStationResultShipProps = {
  trip: TripState;
  origin: StationItem;
} & FetchTripStationResultItem;

function TripStationResultShip({
  trip,
  ship,
  origin,
  cargo,
  location,
  totalProfit,
}: TripStationResultShipProps) {
  if (totalProfit === 0) {
    return null;
  }

  const [main, fleetHanger] = cargo;
  const [
    {
      cargoBay1: { ignore: cargoBay1Ignore },
      cargoBay2: { ignore: cargoBay2Ignore },
    },
    setState,
  ] = useState<{
    cargoBay1: { ignore: number[] };
    cargoBay2: { ignore: number[] };
  }>({ cargoBay1: { ignore: [] }, cargoBay2: { ignore: [] } });

  const ignoreCargoBayItem = (cargoBay: CargoBay) => (itemId: number) => {
    if (cargoBay === CargoBay.One) {
      setState((state) => ({
        ...state,
        cargoBay1: { ignore: [...cargoBay1Ignore, itemId] },
      }));
    } else {
      setState((state) => ({
        ...state,
        cargoBay2: { ignore: [...cargoBay2Ignore, itemId] },
      }));
    }
  };

  return (
    <Stack spacing={5}>
      <Stack alignItems="center">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Stack alignItems="center">
            <Typography variant="h4" mb={1}>
              {getStationDisplayName(origin)}
            </Typography>
          </Stack>
          <ArrowRightAltIcon />
          <Stack alignItems="center">
            <Typography variant="h4" mb={1}>
              {getStationDisplayName(location)}
            </Typography>
          </Stack>
        </Stack>
        <Stack>{ship.name}</Stack>
        <Stack>Ƶ{formatCurrency(totalProfit)} profit</Stack>
      </Stack>
      <Stack spacing={5}>
        <TripStationItemTable
          title="Main"
          maxVolume={ship.cargoBay.main.volume}
          maxCost={trip.maxBudget * 1000000}
          onIgnore={ignoreCargoBayItem(CargoBay.One)}
          {...main}
        />
        {fleetHanger.volume > 0 && (
          <TripStationItemTable
            title="Fleet Hanger"
            maxVolume={ship.cargoBay.fleetHanger?.volume!}
            maxCost={trip.maxBudget * 1000000 - main.cost}
            onIgnore={ignoreCargoBayItem(CargoBay.One)}
            {...fleetHanger}
          />
        )}
      </Stack>
    </Stack>
  );
}

export default TripStationResultShip;
