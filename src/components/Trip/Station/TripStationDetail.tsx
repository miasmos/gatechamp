import { useState } from "react";
import Stack from "@mui/material/Stack";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Typography from "@mui/material/Typography";
import { getStationDisplayName } from "../../../util/eveTrade";
import { CargoBay } from "../../../enum";
import TripStationItemTable from "./TripStationItemTable";
import { formatCurrency } from "../../../util/currency";
import { NavigationIntention } from "../../../types";
import { useRecoilState, useRecoilValue } from "recoil";
import tripDetailState from "../../../recoil/tripDetail/atom";
import tripState from "../../../recoil/trip/atom";
import getShipById from "../../../recoil/ships/selectors/getShipById";
import { useNavigate } from "react-router";
import { clearTripSetter } from "../../../recoil/trip";
import Button from "@mui/material/Button";

type TripStationDetailProps = NavigationIntention;

function TripStationDetail({ to }: TripStationDetailProps) {
  const navigate = useNavigate();
  const { cargo, origin, location, shipId, totalProfit } =
    useRecoilValue(tripDetailState);
  const [trip, setTripState] = useRecoilState(tripState);
  const ship = useRecoilValue(getShipById(shipId));
  const clearTrip = clearTripSetter(setTripState);
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

  const onReset = () => {
    clearTrip();
    navigate(to);
  };

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
        <Stack>{ship?.name}</Stack>
        <Stack>Ƶ{formatCurrency(totalProfit)} profit</Stack>
      </Stack>
      <Stack spacing={5}>
        <TripStationItemTable
          title="Main"
          maxVolume={ship?.cargoBay.main.volume || 0}
          maxCost={trip.maxBudget * 1000000}
          onIgnore={ignoreCargoBayItem(CargoBay.One)}
          {...main}
        />
        {fleetHanger.volume > 0 && (
          <TripStationItemTable
            title="Fleet Hanger"
            maxVolume={ship?.cargoBay.fleetHanger.volume || 0}
            maxCost={trip.maxBudget * 1000000 - main.cost}
            onIgnore={ignoreCargoBayItem(CargoBay.One)}
            {...fleetHanger}
          />
        )}
      </Stack>
      <Button sx={{ height: 60 }} variant="contained" onClick={onReset}>
        Reset
      </Button>
    </Stack>
  );
}

export default TripStationDetail;
