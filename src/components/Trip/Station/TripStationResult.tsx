import { useState } from "react";
import { useMemo } from "react";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Typography from "@mui/material/Typography";
import { ParsedFetchStationItem } from "../../../hooks/useFetchStation";
import { TripState } from "../../../recoil/trip";
import { getStationDisplayName } from "../../../util/eveTrade";
import StationItemTable from "./TripStationItemTable";
import { computeItemEfficiency } from "../../../util/item";
import { CargoBay } from "../../../enum";
import { Ship } from "../../../recoil/ships/atom";

interface TripStationResultProps {
  ship: Ship;
  trip: TripState;
  items: ParsedFetchStationItem[] | undefined;
}

function TripStationResult({ trip, ship, items }: TripStationResultProps) {
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

  const cargoBay1Result = useMemo(
    () =>
      computeItemEfficiency(
        items,
        trip.from,
        trip.maxBudget,
        ship.cargoBay.main,
        cargoBay1Ignore
      ),
    [items, trip, ship, cargoBay1Ignore]
  );
  const cargoBay2Result = useMemo(() => {
    if (
      typeof cargoBay1Result === "undefined" ||
      typeof ship.cargoBay.fleetHanger === "undefined"
    ) {
      return undefined;
    }
    return computeItemEfficiency(
      items,
      trip.from,
      trip.maxBudget - cargoBay1Result.filteredItems.cost,
      ship.cargoBay.fleetHanger,
      cargoBay2Ignore
    );
  }, [items, trip, ship, cargoBay1Result, cargoBay2Ignore]);

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

  if (!cargoBay1Result) {
    return <>Loading...</>;
  }

  const { origin, destination, filteredItems } = cargoBay1Result;
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
              {getStationDisplayName(destination)}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack spacing={5}>
        <StationItemTable
          title="Cargo Hold 1"
          maxVolume={ship.cargoBay.main.volume}
          maxCost={trip.maxBudget * 1000000}
          onIgnore={ignoreCargoBayItem(CargoBay.One)}
          {...filteredItems}
        />
        {cargoBay2Result && (
          <StationItemTable
            title="Cargo Hold 2"
            maxVolume={ship.cargoBay.fleetHanger?.volume!}
            maxCost={trip.maxBudget * 1000000 - filteredItems.cost}
            onIgnore={ignoreCargoBayItem(CargoBay.One)}
            {...cargoBay2Result.filteredItems}
          />
        )}
      </Stack>
    </Stack>
  );
}

export default TripStationResult;
