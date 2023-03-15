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
  const displaySecurity = getDisplaySecurity(security);
  if (typeof displaySecurity !== "number") {
    return undefined;
  }

  if (displaySecurity >= 1) {
    return s1p0; // #2c75e2
  } else if (displaySecurity < 1 && displaySecurity >= 0.9) {
    return s0p9; // #3a9aeb
  } else if (displaySecurity < 0.9 && displaySecurity >= 0.8) {
    return s0p8; // #4ecdf7
  } else if (displaySecurity < 0.8 && displaySecurity >= 0.7) {
    return s0p7; // #61dba4
  } else if (displaySecurity < 0.7 && displaySecurity >= 0.6) {
    return s0p6; // #72e655
  } else if (displaySecurity < 0.6 && displaySecurity >= 0.5) {
    return s0p5; // #f4fe83
  } else if (displaySecurity < 0.5 && displaySecurity >= 0.4) {
    return s0p4; // #dc6d07
  } else if (displaySecurity < 0.4 && displaySecurity >= 0.3) {
    return s0p3; // #ce440f
  } else if (displaySecurity < 0.3 && displaySecurity >= 0.2) {
    return s0p2; // #bc1117
  } else if (displaySecurity < 0.2 && displaySecurity >= 0.1) {
    return s0p1; // #732121
  }
  return s0p0; // #8d3364
};

const getDisplaySecurity = (trueSecurity: number | undefined) => {
  if (typeof trueSecurity !== "number") {
    return undefined;
  }
  if (trueSecurity >= 0 && trueSecurity <= 0.05) {
    return Math.ceil(trueSecurity * 10) / 10;
  }
  return Math.round(trueSecurity * 10) / 10;
};

const isLowSecurity = (trueSecurity: number) =>
  trueSecurity < 0.5 && trueSecurity >= 0.1;

const isHighSecurity = (trueSecurity: number) => trueSecurity >= 0.5;

const isNullSecurity = (trueSecurity: number) => trueSecurity < 0.1;

const isCrossingSecurityBoundary = (
  originTrueSecurity: number | undefined,
  destinationTrueSecurity: number | undefined
) => {
  if (
    typeof originTrueSecurity !== "number" ||
    typeof destinationTrueSecurity !== "number"
  ) {
    return { isHigher: false, isLower: false, isCrossing: false };
  }
  let isHigher = false;
  let isLower = false;
  let isCrossing = false;
  if (isNullSecurity(originTrueSecurity)) {
    if (
      isHighSecurity(destinationTrueSecurity) ||
      isLowSecurity(destinationTrueSecurity)
    ) {
      isHigher = true;
      isCrossing = true;
    }
  } else if (isLowSecurity(originTrueSecurity)) {
    if (isHighSecurity(destinationTrueSecurity)) {
      isHigher = true;
      isCrossing = true;
    } else if (isNullSecurity(destinationTrueSecurity)) {
      isLower = true;
      isCrossing = true;
    }
  } else if (isHighSecurity(originTrueSecurity)) {
    if (
      isNullSecurity(destinationTrueSecurity) ||
      isLowSecurity(destinationTrueSecurity)
    ) {
      isLower = true;
      isCrossing = true;
    }
  }

  return { isHigher, isLower, isCrossing };
};

export {
  stringifyItemsOrder,
  stringifyItemOrder,
  getStationDisplayName,
  getSecurityColor,
  getDisplaySecurity,
  isLowSecurity,
  isHighSecurity,
  isNullSecurity,
  isCrossingSecurityBoundary,
};
