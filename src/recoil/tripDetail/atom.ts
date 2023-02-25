import { atom } from "recoil";
import { StationItem, CargoBayItem } from "../../hooks/useFetchTripStation";

interface TripDetailState {
  origin: StationItem;
  totalItems: number;
  totalCost: number;
  totalVolume: number;
  totalProfit: number;
  shipId: string;
  location: StationItem;
  cargo: CargoBayItem[];
}

const tripDetail = atom<TripDetailState>({
  key: "TripDetailState",
  default: {
    origin: {
      name: "",
      rating: 0,
      station_id: 0,
      system_id: 0,
    },
    totalItems: 0,
    totalCost: 0,
    totalVolume: 0,
    totalProfit: 0,
    shipId: "",
    location: {
      name: "",
      rating: 0,
      station_id: 0,
      system_id: 0,
    },
    cargo: [],
  },
});

export default tripDetail;
export type { TripDetailState };
