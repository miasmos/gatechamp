import useSWR from "swr";
import { postEveTradePlus } from "../api";
import { Ship, ShipsState } from "../recoil/ships";
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
  location: StationItem;
  cargo: CargoBayItem[];
};

type FetchTripStationResult = {
  origin: StationItem;
  items: FetchTripStationResultItem[];
};

function useFetchTripStation(trip: TripState, ships: ShipsState) {
  const {
    data = {
      origin: {
        name: "",
        station_id: 0,
        rating: 0,
        system_id: 0,
      },
      items: [],
    },
    error,
    isLoading,
  } = useSWR<FetchTripStationResult>(
    `/api/trip/station`,
    postEveTradePlus({ trip, ships }),
    {
      shouldRetryOnError: false,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
    }
  );

  return {
    data,
    isLoading,
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
