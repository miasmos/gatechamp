import { Station } from "../enum";
import { formatCurrency } from "./currency";
import { StationItem } from "../hooks/useFetchTripStation";
import { colors } from "../theme";

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

const getSecurityColor = (security: number) => {
  const { s1p0, s0p0, s0p1, s0p2, s0p3, s0p4, s0p5, s0p6, s0p7, s0p8, s0p9 } =
    colors.eve.security;
  if (security === 1) {
    return s1p0;
  } else if (security < 1 && security >= 0.9) {
    return s0p9;
  } else if (security < 0.9 && security >= 0.8) {
    return s0p8;
  } else if (security < 0.8 && security >= 0.7) {
    return s0p7;
  } else if (security < 0.7 && security >= 0.6) {
    return s0p6;
  } else if (security < 0.6 && security >= 0.5) {
    return s0p5;
  } else if (security < 0.5 && security >= 0.4) {
    return s0p4;
  } else if (security < 0.4 && security >= 0.3) {
    return s0p3;
  } else if (security < 0.3 && security >= 0.2) {
    return s0p2;
  } else if (security < 0.2 && security >= 0.1) {
    return s0p1;
  }
  return s0p0;
};

export {
  stringifyItemsOrder,
  stringifyItemOrder,
  getStationDisplayName,
  getSecurityColor,
};
