import { useMemo } from "react";
import useSWR from "swr";
import { fetchEveTrade } from "../api";
import { Station, SystemSecurity } from "../enum";
import { TripState } from "../recoil/trip";
import { getStationRegion, getPackagedVolume } from "../util/eveTrade";

interface StationItem {
  name: string;
  rating: number;
  station_id: number;
  system_id: number;
}

interface ParsedFetchStationItem {
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
}

interface FetchStationItem {
  "Buy Price": string;
  From: StationItem;
  "Gross Margin": string;
  Item: string;
  "Item ID": number;
  Jumps: string;
  "Net Costs": string;
  "Net Profit": string;
  "Net Sales": string;
  "Profit Per Item": string;
  "Profit per Jump": string;
  Quantity: string;
  ROI: string;
  "Sales Taxes": string;
  "Sell Price": string;
  "Take To": StationItem;
  "Total Volume (m3)": string;
}

const parseCurrency = (value: string) => parseFloat(value.replace(/,|%/g, ""));
const parseItem = (props: FetchStationItem): ParsedFetchStationItem => {
  const itemId = props["Item ID"];
  const parsedVolume = parseCurrency(props["Total Volume (m3)"]);
  const parsedQuantity = parseCurrency(props.Quantity);
  const packagedVolume = getPackagedVolume(itemId);
  return {
    buyPrice: parseCurrency(props["Buy Price"]),
    from: props.From,
    grossMargin: parseCurrency(props["Gross Margin"]),
    item: props.Item,
    itemId,
    jumps: parseCurrency(props.Jumps),
    netCosts: parseCurrency(props["Net Costs"]),
    netProfit: parseCurrency(props["Net Profit"]),
    netSales: parseCurrency(props["Net Sales"]),
    profitPerItem: parseCurrency(props["Profit Per Item"]),
    profitPerJump: parseCurrency(props["Profit per Jump"]),
    quantity: parsedQuantity,
    roi: parseFloat(props.ROI) / 100,
    salesTaxes: parseCurrency(props["Sales Taxes"]),
    sellPrice: parseCurrency(props["Sell Price"]),
    takeTo: props["Take To"],
    volume: parsedVolume,
    packagedVolume: packagedVolume
      ? packagedVolume * parsedQuantity
      : undefined,
  };
};

function useFetchStation({
  from,
  to,
  maxBudget,
  minProfit,
  minRoi,
  routeSafety,
  security,
  tax,
}: TripState) {
  // sanitize/format inputs
  const serializeStation = (values: boolean[]) =>
    values.reduce((prev, current, index) => {
      if (current) {
        const station = Object.values(Station)[index];
        const region = getStationRegion(station);
        const delimiter = prev.length === 0 ? "" : ",";
        prev += `${delimiter}${region}:${station}`;
      }

      return prev;
    }, "");

  const fromStr = `${getStationRegion(from)}:${from}`;
  const toStr = serializeStation(to);
  const maxBudgetStr = (maxBudget * 1000000).toString();
  const minProfitStr = (minProfit * 1000000).toString();
  const securityStr = security.reduce((prev, current, index) => {
    if (!current) {
      const status = Object.values(SystemSecurity)[index];
      const delimiter = prev.length === 0 ? "" : ",";
      prev += `${delimiter}${status}`;
    }
    return prev;
  }, "");

  // construct query string
  const query = [
    [`from`, `sell-${fromStr}`],
    [`to`, `buy-${toStr}`],
    [`maxBudget`, `${maxBudgetStr}`],
    [`maxWeight`, `9007199254740991`], // infinite weight, we want all the data
    [`minProfit`, `${minProfitStr}`],
    [`minROI`, `${minRoi}`],
    [`routeSafety`, `${routeSafety}`],
    [`systemSecurity`, `${securityStr}`],
    [`tax`, `${tax}`],
  ]
    .map(([name, value]) => `${name}=${encodeURIComponent(value)}`)
    .join("&");

  // fetch api
  const { data, error, isLoading } = useSWR<FetchStationItem[]>(
    `/?${query}`,
    fetchEveTrade,
    {
      shouldRetryOnError: false,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
    }
  );

  // sanitize/format api response
  const parsedData: ParsedFetchStationItem[] | undefined = useMemo(() => {
    return data ? data.map((item) => parseItem(item)) : undefined;
  }, [data]);

  return {
    items: parsedData,
    isLoading,
    hasError: error,
  };
}

export default useFetchStation;
export type { StationItem, FetchStationItem, ParsedFetchStationItem };
