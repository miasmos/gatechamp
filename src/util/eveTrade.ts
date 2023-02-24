import { Region, Station } from "../enum";
import { formatCurrency } from "./currency";
import shipVolumeData from "../data/ship-volume.json";
import { StationItem } from "../hooks/useFetchStation";

const getStationRegion = (station: Station) => {
  switch (station) {
    case Station.Amarr:
      return Region.Domain;
    case Station.Hek:
      return Region.Metropolis;
    case Station.Jita:
      return Region.TheForge;
    case Station.Dodixie:
      return Region.SinqLaison;
    case Station.Rens:
      return Region.Heimatar;
    case Station.None:
      return Region.None;
    default:
      throw new Error("unknown station");
  }
};

const getStationDisplayName = (station: StationItem) => {
  switch (station.station_id.toString()) {
    case Station.Jita:
      return "Jita";
    case Station.Amarr:
      return "Amarr";
    case Station.Hek:
      return "Hek";
    case Station.Dodixie:
      return "Dodixie";
    case Station.Rens:
      return "Rens";
  }
};

const getPackagedVolume = (id: number) => {
  const idStr = id.toString();
  if (idStr in shipVolumeData) {
    return (shipVolumeData as Record<string, number>)[idStr];
  }
  return undefined;
};

const stringifyItemsOrder = (
  items: {
    item: string;
    quantity: number;
    buyPrice: number;
  }[]
) => items.reduce((prev, item) => `${prev}${stringifyItemOrder(item)}\n`, "");

const stringifyItemOrder = ({
  item,
  quantity,
  buyPrice,
}: {
  item: string;
  quantity: number;
  buyPrice: number;
}) => {
  return `${item}\t${quantity}\t${formatCurrency(buyPrice, "long")}`;
};

export {
  getStationRegion,
  stringifyItemsOrder,
  stringifyItemOrder,
  getPackagedVolume,
  getStationDisplayName,
};
