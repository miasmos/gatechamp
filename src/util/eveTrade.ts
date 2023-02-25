import { Station } from "../enum";
import { formatCurrency } from "./currency";
import { StationItem } from "../hooks/useFetchTripStation";

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

export { stringifyItemsOrder, stringifyItemOrder, getStationDisplayName };
