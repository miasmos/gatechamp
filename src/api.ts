import Axios from "axios";
import { EVE_TRADE_PLUS_DOMAIN } from "./constants";
import { wait } from "./util/promise";

const EveTradePlusClient = Axios.create({
  baseURL: `http://${EVE_TRADE_PLUS_DOMAIN}`,
  timeout: 60000,
});

const getEveTradePlus = (url: string) =>
  EveTradePlusClient.get(url).then((response) => response.data);

const postEveTradePlus =
  <T>(data: T) =>
  (url: string) =>
    EveTradePlusClient.post(url, data).then((response) => response.data);

const fetchMock =
  <T>(data: T) =>
  async () => {
    await wait(200);
    return data;
  };

export { getEveTradePlus, postEveTradePlus, fetchMock };
