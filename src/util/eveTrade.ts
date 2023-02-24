import { Region, Station } from "../enum";
import { formatCurrency } from "./currency";
import shipVolumeData from "../data/ship-volume.json";

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
    default:
      throw new Error("unknown station");
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
    sellPrice: number;
  }[],
  mode: "buy" | "sell"
) =>
  items.reduce(
    (prev, { item, quantity, buyPrice, sellPrice }) =>
      `${prev}${item}\t${quantity}\t${formatCurrency(
        mode === "buy" ? buyPrice : sellPrice,
        "long"
      )}\n`,
    ""
  );

export { getStationRegion, stringifyItemsOrder, getPackagedVolume };
