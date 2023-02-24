import { ParsedFetchStationItem } from "./hooks/useFetchStation";

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

export type { ParsedFetchStationItemWithEfficiency, EfficientItemsResult };
