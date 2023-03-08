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
  const roundedSecurity = Math.round(security * 10) / 10;
  if (roundedSecurity >= 1) {
    return s1p0; // #2c75e2
  } else if (roundedSecurity < 1 && roundedSecurity >= 0.9) {
    return s0p9; // #3a9aeb
  } else if (roundedSecurity < 0.9 && roundedSecurity >= 0.8) {
    return s0p8; // #4ecdf7
  } else if (roundedSecurity < 0.8 && roundedSecurity >= 0.7) {
    return s0p7; // #61dba4
  } else if (roundedSecurity < 0.7 && roundedSecurity >= 0.6) {
    return s0p6; // #72e655
  } else if (roundedSecurity < 0.6 && roundedSecurity >= 0.5) {
    return s0p5; // #f4fe83
  } else if (roundedSecurity < 0.5 && roundedSecurity >= 0.4) {
    return s0p4; // #dc6d07
  } else if (roundedSecurity < 0.4 && roundedSecurity >= 0.3) {
    return s0p3; // #ce440f
  } else if (roundedSecurity < 0.3 && roundedSecurity >= 0.2) {
    return s0p2; // #bc1117
  } else if (roundedSecurity < 0.2 && roundedSecurity >= 0.1) {
    return s0p1; // #732121
  }
  return s0p0; // #8d3364
};

export {
  stringifyItemsOrder,
  stringifyItemOrder,
  getStationDisplayName,
  getSecurityColor,
};
