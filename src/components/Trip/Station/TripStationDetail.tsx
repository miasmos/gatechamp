import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Typography from "@mui/material/Typography";
import { getStationDisplayName, objectifyItemsOrder } from "../../../util/eve";
import { CargoBay } from "../../../enum";
import TripStationItemTable from "./TripStationItemTable";
import { formatCurrency } from "../../../util/currency";
import { NavigationIntention } from "../../../types";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import tripState from "../../../recoil/trip/atom";
import { useLocation, useNavigate } from "react-router";
import { clearTripSetter } from "../../../recoil/trip";
import MainButton from "../../MainButton";
import RouteRenderer from "../../Route/RouteRenderer";
import {
  destinationSetter,
  getJumpsSelector,
  originSetter,
} from "../../../recoil/route";
import routeState from "../../../recoil/route/atom";
import useMyLocation from "../../../hooks/useMyLocation";
import usePushRoute from "../../../hooks/usePushRoute";

type TripStationDetailProps = NavigationIntention;

function TripStationDetail({ to }: TripStationDetailProps) {
  const { onUseMyLocation } = useMyLocation();
  const { onPushRoute } = usePushRoute();
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const setRoute = useSetRecoilState(routeState);
  const jumps = useRecoilValue(getJumpsSelector);
  const { cargo, origin, destination, ship, totalProfit, profitPerJump } =
    routerLocation.state;
  const setOrigin = originSetter(setRoute);
  const setDestination = destinationSetter(setRoute);
  const [trip, setTripState] = useRecoilState(tripState);

  const clearTrip = clearTripSetter(setTripState);
  const [main, fleetHanger] = cargo;
  const [
    {
      cargoBay1: { ignore: cargoBay1Ignore, filtered: cargoBay1Filtered },
      cargoBay2: { ignore: cargoBay2Ignore, filtered: cargoBay2Filtered },
    },
    setState,
  ] = useState<{
    cargoBay1: { ignore: number[], filtered: any };
    cargoBay2: { ignore: number[], filtered: any };
  }>({ cargoBay1: { ignore: [], filtered: [] }, cargoBay2: { ignore: [], filtered: [] } });

  const onReset = () => {
    clearTrip();
    navigate(to);
  };
  const ignoreCargoBayItem = (cargoBay: CargoBay) => (itemId: number) => {
    if (cargoBay === CargoBay.One) {
      setState((state) => ({
        ...state,
        cargoBay1: { ...state.cargoBay1, ignore: [...cargoBay1Ignore, itemId], },
      }));
    } else {
      setState((state) => ({
        ...state,
        cargoBay2: { ...state.cargoBay2, ignore: [...cargoBay2Ignore, itemId] },
      }));
    }
  };
  const onClearFilter = (cargoBay: CargoBay) => () => {
    if (cargoBay === CargoBay.One) {
      setState(state => ({ ...state, cargoBay1: { ...state.cargoBay1, filtered: [] } }));
    } else {
      setState(state => ({ ...state, cargoBay2: { ...state.cargoBay2, filtered: [] } }));
    }
  }
  const onOrder = (cargoBay: CargoBay) => async () => {
    const text = await navigator.clipboard.readText();
    const obj = objectifyItemsOrder(text);
    let filtered = [];

    for(let i in obj.items) {
      const item2 = obj.items[i];
      const item1 = main.items.find((item:any) => item.item === item2.item);
      if (!item1 || item2.buyPrice >= item1.sellPrice) {
        continue;
      }
      filtered.push({
        ...item1,
        sellPrice: item2.buyPrice,
        netProfit: (item1.sellPrice - item2.buyPrice) * item1.quantity
      });
    }

    if (filtered.length === 0) {
      return;
    }

    if (cargoBay === CargoBay.One) {
      setState(state => ({ ...state, cargoBay1: { ...state.cargoBay1, filtered: [] } }));
    } else {
      setState(state => ({ ...state, cargoBay2: { ...state.cargoBay2, filtered: [] } }));
    }
  }
  const iskPerJump = jumps ? totalProfit / jumps : profitPerJump;

  useEffect(() => {
    setOrigin(origin.system_id);
    setDestination(destination.system_id);
    onUseMyLocation(true);
  }, []);

  return (
    <Stack>
      <Stack alignItems="center">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Stack alignItems="center">
            <Typography variant="h3" mb={1}>
              {getStationDisplayName(origin)}
            </Typography>
          </Stack>
          <ArrowRightAltIcon fontSize="large" />
          <Stack alignItems="center">
            <Typography variant="h3" mb={1}>
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
        <RouteRenderer mt={1} width="100%" />
      </Stack>
      <Stack spacing={5} mt={5}>
        <TripStationItemTable
          title="Main"
          maxVolume={ship?.cargoBay.main.volume || 0}
          maxCost={trip.maxBudget * 1000000}
          onIgnore={ignoreCargoBayItem(CargoBay.One)}
          onPasteOrder={onOrder(CargoBay.One)}
          filtered={cargoBay1Filtered.length > 0}
          {...main}
          items={cargoBay1Filtered.length > 0 ? cargoBay1Filtered : main.items}
          clearFilter={onClearFilter(CargoBay.One)}
        />
        {fleetHanger.volume > 0 && (
          <TripStationItemTable
            title="Fleet Hanger"
            maxVolume={ship?.cargoBay.fleetHanger.volume || 0}
            maxCost={trip.maxBudget * 1000000 - main.cost}
            onIgnore={ignoreCargoBayItem(CargoBay.Two)}
            onPasteOrder={onOrder(CargoBay.Two)}
            filtered={cargoBay2Filtered.length > 0}
            {...fleetHanger}
             items={cargoBay2Filtered.length > 0 ? cargoBay2Filtered : fleetHanger.items}
             clearFilter={onClearFilter(CargoBay.Two)}
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
