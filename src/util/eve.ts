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

const objectifyItemsOrder = (str: string): {
  items: {
    item: string;
    quantity: number;
    buyPrice: number;
    totalPrice: number;
  }[], totalPrice: number;
} => {
  const items = str.split('\n').reduce<{
    item: string;
    quantity: number;
    buyPrice: number;
    totalPrice: number;
  }[]>((prev, current) => {
    const [item, quantity, buyPrice, totalPrice] = current.split('\t');
    prev.push({ 
      item, 
      quantity: typeof quantity === 'string' ? Number(quantity.replace(/,/g, '')) : 0, 
      buyPrice: typeof buyPrice === 'string' ? Number(buyPrice.replace(/,/g, '')) : 0, 
      totalPrice: typeof totalPrice === 'string' ? Number(totalPrice.replace(/,/g, '')) : 0 
    });
    return prev;
  }, []);

  const [{ totalPrice }] = items.splice(items.length - 1, 1)
  return { items, totalPrice }
}

const stringifyItemOrder = ({
  item,
  quantity,
  buyPrice,
}: {
  item: string;
  quantity: number;
  buyPrice: number;
}) => {
  return `${item}\t${quantity}\t${formatCurrency(buyPrice, 0, "long")}`;
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

const calculateHaulerReward = (
  collateral: number,
  volume: number,
  jumps: number,
  hasRushDelivery: boolean,
  isLowOrNullSecurity: boolean
) => {
  let base = 1e6;
  let additive = 0;
  let multiplier = 1;
  let isValid = true;
  let reward;
  let doesFit = true;

  if (volume <= 12e3) {
    multiplier *= 1;
  } else if (volume <= 60e3) {
    multiplier *= 1;
  }
  if (volume > 62500 && collateral < 1e9) {
    collateral = (3e9 + collateral) / 4;
  } //low freighter collateral pays more
  if (volume <= 60000 && volume > 12000 && collateral < 1e9) {
    collateral = (1e9 + collateral) / 2;
  } //low DST collateral pays more
  if (volume <= 12000 && collateral < 1e9) {
    collateral = (100e6 + collateral) / 1.1;
  } //low BR/t1 collateral pays more

  if (jumps < 1) {
    jumps = 1;
  } //same system counts as 1 jump
  if (jumps < 5) {
    //low jumps pay more.
    jumps = (5 + jumps) * 0.5;
  }

  if (collateral > 3e9 && volume > 60e3) {
    multiplier *= Math.max(1.0, Math.log(collateral / 15e7) / Math.log(15));
  }

  if (collateral > 2e9 && volume > 60e3) {
    doesFit = false;
  }

  if (volume > 1050e3) {
    additive += 250e3;
    if (collateral > 2e9) {
      additive += 200e3;
    }
  } else if (volume > 880e3) {
    if (collateral > 1.5e9) {
      additive += 100e3;
    }
    if (collateral > 2.5e9) {
      additive += 100e3;
    }
    if (collateral > 3e9) {
      additive += 200e3;
    }
  } else if (volume > 750e3) {
    if (collateral > 2.5e9) {
      additive += 100e3;
    }
    if (collateral > 3e9) {
      additive += 200e3;
    }
  } else if (volume > 500e3) {
    if (collateral > 2.0e9) {
      additive += 100e3;
    }
    if (collateral > 3.5e9) {
      additive += 100e3;
    }
  }

  if (hasRushDelivery) {
    if (collateral > 2e9) {
      multiplier *=
        2.0 * Math.max(1.0, Math.log(collateral / 1e8) / Math.log(20));
    } else {
      multiplier *= 2.0;
    }
    if (isLowOrNullSecurity) {
      multiplier *= 2;
    }
  }
  if (isLowOrNullSecurity) {
    multiplier *= 2;
    //Non JF lowsec pays double.
  }
  if (!isLowOrNullSecurity || volume <= 62500) {
    //highsec or non JF lowsec
    reward = ((multiplier * base * collateral) / 1e9 + additive) * jumps;
  } else if (isLowOrNullSecurity && volume > 386e3) {
    isValid = false;
  } else {
    //null, JF
    base = 60e6;
    if (volume < 100) {
      multiplier = 0.25;
    } else if (volume <= 12e3) {
      multiplier = 0.5;
    } else if (volume <= 60e3) {
      multiplier = 0.75;
    } else if (volume <= 340e3) {
      multiplier = 1;
    } else {
      multiplier = 4;
    }
    if (hasRushDelivery) {
      multiplier *= 2;
    }
    reward = multiplier * base * Math.max(1.0, jumps / 7) + collateral * 0.01;
  }

  return { isValid, reward, doesFit };
};

export {
  objectifyItemsOrder,
  stringifyItemsOrder,
  stringifyItemOrder,
  getStationDisplayName,
  getSecurityColor,
  getDisplaySecurity,
  isLowSecurity,
  isHighSecurity,
  isNullSecurity,
  isCrossingSecurityBoundary,
  calculateHaulerReward,
};
