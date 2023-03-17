import useSWR from "swr";
import { post } from "../api";
import { Ship } from "../recoil/ships";
import { TripState } from "../recoil/trip";

interface StationItem {
  name: string;
  rating: number;
  station_id: number;
  system_id: number;
}

interface CargoBayItem {
  items: FetchStationItem[];
  remainingItems: FetchStationItem[];
  volume: number;
  cost: number;
  profit: number;
}

interface FetchStationItem {
  buyPrice: number;
  from: StationItem;
  grossMargin: number;
  item: string;
  itemId: number;
  jumps: number;
  netCosts: number;
  netProfit: number;
  netSales: number;
  profitPerItem: number;
  profitPerJump: number;
  quantity: number;
  roi: number;
  salesTaxes: number;
  sellPrice: number;
  takeTo: StationItem;
  volume: number;
  packagedVolume: number | undefined;
  efficiency: number;
}

type FetchTripStationResultItem = {
  totalItems: number;
  totalCost: number;
  totalVolume: number;
  totalProfit: number;
  ship: Ship;
  profitPerJump: number;
  destination: StationItem;
  origin: StationItem;
  cargo: CargoBayItem[];
};

type FetchTripStationResult = FetchTripStationResultItem[];

function useFetchTripStation(id: string, trip: TripState, ships: Ship[]) {
  const {
    data = [],
    error,
    isLoading,
    isValidating,
  } = useSWR<FetchTripStationResult>(
    `/v1/trip/station?id=${id}`,
    post({ trip, ships }, 120000),
    {
      shouldRetryOnError: false,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  return {
    data,
    isLoading,
    isValidating,
    hasError: error,
  };
}

export default useFetchTripStation;
export type {
  FetchTripStationResult,
  FetchTripStationResultItem,
  StationItem,
  CargoBayItem,
};
