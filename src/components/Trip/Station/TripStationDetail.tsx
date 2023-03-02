import { useState } from "react";
import Stack from "@mui/material/Stack";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Typography from "@mui/material/Typography";
import { getStationDisplayName } from "../../../util/eveTrade";
import { CargoBay } from "../../../enum";
import TripStationItemTable from "./TripStationItemTable";
import { formatCurrency } from "../../../util/currency";
import { NavigationIntention } from "../../../types";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import tripState from "../../../recoil/trip/atom";
import { useLocation, useNavigate } from "react-router";
import { clearTripSetter } from "../../../recoil/trip";
import MainButton from "../../MainButton";
import useFetchRoute from "../../../hooks/useFetchRoute";
import RouteRenderer from "../../Route/RouteRenderer";
import routeState from "../../../recoil/route/atom";
import {
  addAvoidSystemSetter,
  deleteAvoidSystemSetter,
} from "../../../recoil/route";
import { Chip } from "@mui/material";

type TripStationDetailProps = NavigationIntention;

function TripStationDetail({ to }: TripStationDetailProps) {
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const { cargo, origin, destination, ship, totalProfit } =
    routerLocation.state;
  const [trip, setTripState] = useRecoilState(tripState);
  const setRouteState = useSetRecoilState(routeState);
  const { avoidedSolarSystems } = useRecoilValue(routeState);
  const {
    data: route,
    isLoading,
    isValidating,
  } = useFetchRoute(
    origin.system_id,
    destination.system_id,
    avoidedSolarSystems.map(({ solarSystemID }) => solarSystemID)
  );

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
  const onAvoidSolarSystem = (solarSystemID: number, name: string) =>
    addAvoidSystemSetter(setRouteState)({ solarSystemID, name });
  const onUnavoidSolarSystem = (index: number) =>
    deleteAvoidSystemSetter(setRouteState)(index);
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
        <Stack>Ƶ{formatCurrency(totalProfit)} profit</Stack>
        <RouteRenderer
          mt={1}
          route={route}
          onAvoid={onAvoidSolarSystem}
          width={800}
        />
        <Stack alignItems="flex-start" direction="row" spacing={2}>
          {avoidedSolarSystems.map(({ name }, index) => (
            <Chip
              key={name}
              label={name}
              onDelete={() => onUnavoidSolarSystem(index)}
            />
          ))}
        </Stack>
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
