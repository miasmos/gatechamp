import { Station } from "../enum";
import { ParsedFetchStationItem, StationItem } from "../hooks/useFetchStation";
import { Ship, ShipCargoBay } from "../recoil/ships";
import { TripState } from "../recoil/trip";
import {
  ParsedFetchStationItemWithEfficiency,
  EfficientItemsResult,
} from "../types";

const getEfficientItems = (
  items: ParsedFetchStationItemWithEfficiency[],
  maxWeight: number,
  maxCost: number,
  ignoreIds: number[]
): EfficientItemsResult => {
  let currentWeight = 0;
  let currentCost = 0;
  let profit = 0;
  let didAddItem = false;
  const currentItems = items.slice();
  const boughtItems: ParsedFetchStationItemWithEfficiency[] = [];
  const notBoughtItems: ParsedFetchStationItemWithEfficiency[] = [];

  for (let i = 0; i < currentItems.length; i++) {
    const item = currentItems[i];

    if (ignoreIds.includes(item.itemId)) {
      continue;
    }

    const normalizedVolume = item.packagedVolume || item.volume;
    const isOverVolume = normalizedVolume + currentWeight > maxWeight;
    const isOverCost = item.quantity * item.buyPrice + currentCost > maxCost;

    if (isOverVolume || isOverCost) {
      const costRemaining = maxCost - currentCost;
      const weightRemaining = maxWeight - currentWeight;
      const volumePerUnit = normalizedVolume / item.quantity;
      const profitPerUnit = item.netProfit / item.quantity;
      const costUnitsCount = Math.floor(costRemaining / item.buyPrice);
      const weightUnitsCount = Math.floor(weightRemaining / volumePerUnit);
      const unitsCount = Math.min(costUnitsCount, weightUnitsCount);

      if (unitsCount > 0) {
        const unitsVolume = unitsCount * volumePerUnit;
        const unitsProfit = unitsCount * profitPerUnit;
        const unitsCost = unitsCount * item.buyPrice;
        currentWeight += unitsVolume;
        currentCost += unitsCost;
        profit += unitsProfit;
        didAddItem = true;

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
          volume: normalizedVolume - unitsVolume,
        });
      }
    } else {
      currentWeight += normalizedVolume;
      currentCost += item.quantity * item.buyPrice;
      profit += item.quantity * item.sellPrice - item.quantity * item.buyPrice;
      boughtItems.push(item);
      didAddItem = true;
    }

    if (didAddItem) {
      currentItems.shift();
      i--;
    }

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

// profit per m3 per unit
const getItemEfficiency = ({
  netProfit,
  volume,
  quantity,
}: ParsedFetchStationItem) => netProfit / volume / quantity;

const computeItemEfficiency = (
  items: ParsedFetchStationItem[] | undefined,
  originId: Station,
  maxBudget: number,
  cargoBay: ShipCargoBay<any>,
  ignoredItemIds: number[]
) => {
  if (!items) {
    return undefined;
  }

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
  const [mostEfficientItems] = Object.entries(itemsByStation)
    .map<[string, ReturnType<typeof getEfficientItems>]>(
      ([stationId, items]) => [
        stationId,
        getEfficientItems(
          items,
          cargoBay.volume,
          maxBudget * 1000000,
          ignoredItemIds
        ),
      ]
    )
    .sort((a, b) => b[1].profit - a[1].profit);
  const origin = locations[Number(originId)];
  const destination = locations[Number(mostEfficientItems[0])];
  const filteredItems = mostEfficientItems[1];

  return {
    origin,
    destination,
    filteredItems,
  };
};

export { computeItemEfficiency };
