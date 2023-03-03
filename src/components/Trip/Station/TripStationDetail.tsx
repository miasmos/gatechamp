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
import tripState from "../../../recoil/trip/atom";
import { useLocation, useNavigate } from "react-router";
import { clearTripSetter } from "../../../recoil/trip";
import MainButton from "../../MainButton";
import RouteRenderer from "../../Route/RouteRenderer";
import { getJumpsSelector } from "../../../recoil/route";

type TripStationDetailProps = NavigationIntention;

function TripStationDetail({ to }: TripStationDetailProps) {
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const jumps = useRecoilValue(getJumpsSelector);
  const { cargo, origin, destination, ship, totalProfit, profitPerJump } =
    routerLocation.state;
  const [trip, setTripState] = useRecoilState(tripState);

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
  const iskPerJump = jumps ? totalProfit / jumps : profitPerJump;

  return (
    <Stack>
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
              {getStationDisplayName(destination)}
            </Typography>
          </Stack>
        </Stack>
        <Stack>{ship?.name}</Stack>
        <Stack direction="row" spacing={2}>
          <Stack direction="row">
            <Typography variant="body2" mt={0.3}>
              Ƶ
            </Typography>
            <Typography>{formatCurrency(totalProfit)}</Typography>
            <Typography variant="body2" mt={0.4}>
              &nbsp;profit
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography variant="body2" mt={0.3}>
              Ƶ
            </Typography>
            <Typography>{formatCurrency(iskPerJump)}</Typography>
            <Typography variant="body2" mt={0.4}>
              &nbsp;/ jump
            </Typography>
          </Stack>
        </Stack>
        <RouteRenderer mt={1} width={800} />
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
            onIgnore={ignoreCargoBayItem(CargoBay.Two)}
            {...fleetHanger}
          />
        )}
      </Stack>
      <Stack mt={5} direction="row" justifyContent="center">
        <MainButton onClick={onReset}>Reset</MainButton>
      </Stack>
    </Stack>
  );
}

export default TripStationDetail;
