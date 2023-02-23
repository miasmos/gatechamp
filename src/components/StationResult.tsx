import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useMemo } from "react";
import useFetchStation, {
  ParsedFetchStationItem,
  StationItem,
} from "../hooks/useFetchStation";
import { StationFormState } from "./StationForm";
import StationItemTable from "./StationItemTable";

interface StationResultProps {
  form: StationFormState;
  onReset: () => void;
}

type ParsedFetchStationItemWithEfficiency = ParsedFetchStationItem & {
  efficiency: number;
};

type EfficientItemsResult = {
  items: ParsedFetchStationItemWithEfficiency[];
  remainingItems: ParsedFetchStationItemWithEfficiency[];
  volume: number;
  cost: number;
  profit: number;
};

function StationResult({ form, onReset }: StationResultProps) {
  const { items, isLoading, hasError } = useFetchStation(form);
  const result = useMemo(() => {
    if (!items) {
      return undefined;
    }

    // profit per m3 per unit
    const getItemEfficiency = ({
      netProfit,
      volume,
      quantity,
    }: ParsedFetchStationItem) => netProfit / volume / quantity;

    const getEfficientItems = (
      items: ParsedFetchStationItemWithEfficiency[],
      maxWeight: number,
      maxCost: number
    ): EfficientItemsResult => {
      let currentWeight = 0;
      let currentCost = 0;
      let profit = 0;
      const currentItems = items.slice();
      const boughtItems: ParsedFetchStationItemWithEfficiency[] = [];
      const notBoughtItems: ParsedFetchStationItemWithEfficiency[] = [];

      for (let i = 0; i < currentItems.length; i++) {
        const item = currentItems[i];
        const isOverVolume = item.volume + currentWeight > maxWeight;
        const isOverCost = item.netCosts + currentCost > maxCost;

        if (isOverVolume || isOverCost) {
          const costRemaining = maxCost - currentCost;
          const weightRemaining = maxWeight - currentWeight;
          const volumePerUnit = item.volume / item.quantity;
          const profitPerUnit = item.netProfit / item.quantity;
          let unitsCount = 0;

          if (isOverCost) {
            unitsCount = Math.floor(costRemaining / item.buyPrice);
          } else {
            unitsCount = Math.floor(weightRemaining / volumePerUnit);
          }

          if (unitsCount > 0) {
            const unitsVolume = unitsCount * volumePerUnit;
            const unitsProfit = unitsCount * profitPerUnit;
            const unitsCost = unitsCount * item.buyPrice;
            currentWeight += unitsVolume;
            currentCost += unitsCost;
            profit += unitsProfit;

            // TODO: recalculate remainder of item props
            boughtItems.push({
              ...item,
              netProfit: unitsProfit,
              quantity: unitsCount,
              volume: unitsVolume,
            });
            notBoughtItems.push({
              ...item,
              netProfit: item.netProfit - unitsProfit,
              quantity: item.quantity - unitsCount,
              volume: item.volume - unitsVolume,
            });
          }
        } else {
          currentWeight += item.volume;
          currentCost += item.netCosts;
          profit += item.netProfit;
          boughtItems.push(item);
        }

        currentItems.shift();
        i--;

        if (currentWeight + 0.11 >= maxWeight || currentCost + 1000 > maxCost) {
          notBoughtItems.concat(currentItems);
          break;
        }
      }

      return {
        items: boughtItems,
        cost: currentCost,
        remainingItems: notBoughtItems,
        volume: currentWeight,
        profit,
      };
    };

    // sort items by station, cache station data
    const locations: Record<number, StationItem> = {};
    const itemsByStation = items.reduce<
      Record<number, ParsedFetchStationItemWithEfficiency[]>
    >((prev, current) => {
      const destinationId = current.takeTo.station_id;
      const originId = current.from.station_id;

      if (!(originId in locations)) {
        locations[originId] = current.from;
      }
      if (!(destinationId in locations)) {
        locations[destinationId] = current.takeTo;
      }
      if (!(destinationId in prev)) {
        prev[destinationId] = [];
      }

      prev[destinationId].push({
        ...current,
        efficiency: getItemEfficiency(current),
      });
      return prev;
    }, {});

    // sort items by efficiency
    Object.entries(itemsByStation).forEach(
      ([stationId, items]) =>
        (itemsByStation[Number(stationId)] = items.sort(
          (a, b) => b.efficiency - a.efficiency
        ))
    );

    // get most efficient items/destination
    const higherMaxWeight = Math.max(form.maxWeight, form.maxWeight2);
    const lowerMaxWeight = Math.min(form.maxWeight, form.maxWeight2);

    const [mostEfficientItems] = Object.entries(itemsByStation)
      .map<[string, ReturnType<typeof getEfficientItems>]>(
        ([stationId, items]) => [
          stationId,
          getEfficientItems(items, higherMaxWeight, form.maxBudget * 1000000),
        ]
      )
      .sort((a, b) => b[1].profit - a[1].profit);
    const destination = locations[Number(mostEfficientItems[0])];
    const cargoHold1Items = mostEfficientItems[1];
    const cargoHold2Items = getEfficientItems(
      cargoHold1Items.remainingItems,
      lowerMaxWeight,
      form.maxBudget * 1000000 - cargoHold1Items.cost
    );

    return {
      station: destination,
      cargoHold1: cargoHold1Items,
      cargoHold2: cargoHold2Items,
    };
  }, [items]);

  if (hasError) {
    console.log("error while fetching", hasError);
  }
  if (!result) {
    return <>Loading...</>;
  }

  const { station, cargoHold1, cargoHold2 } = result;
  return (
    <Stack spacing={3}>
      <Typography variant="h2">{station.name}</Typography>
      <Stack spacing={5}>
        <StationItemTable
          title="Cargo Hold 1"
          maxVolume={form.maxWeight}
          maxCost={form.maxBudget * 1000000}
          {...cargoHold1}
        />
        <StationItemTable
          title="Cargo Hold 2"
          maxVolume={form.maxWeight2}
          maxCost={form.maxBudget * 1000000}
          {...cargoHold2}
        />
      </Stack>
      <Button variant="contained" onClick={onReset}>
        Reset
      </Button>
    </Stack>
  );
}

export default StationResult;
export type { EfficientItemsResult };
