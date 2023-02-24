import Axios, { AxiosInstance } from "axios";
import { EVE_TRADE_DOMAIN } from "./constants";
import { wait } from "./util/promise";

const EveTradeClient = Axios.create({
  baseURL: `https://${EVE_TRADE_DOMAIN}`,
  timeout: 30000,
});

const fetch = (client: AxiosInstance, url: string) =>
  client.get(url).then((response) => response.data);

const fetchEveTrade = (url: string) => fetch(EveTradeClient, url);

const fetchMock =
  <T>(data: T) =>
  async () => {
    await wait(200);
    return data;
  };

export { fetchEveTrade, fetchMock };
