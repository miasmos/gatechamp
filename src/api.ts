import Axios from "axios";
import { EVE_TRADE_DOMAIN } from "./constants";
import { wait } from "./util/promise";

const client = Axios.create({
  baseURL: `https://${EVE_TRADE_DOMAIN}`,
  timeout: 30000,
});

const fetch = (url: string) =>
  client.get(url).then((response) => response.data);

const fetchMock =
  <T>(data: T) =>
  async () => {
    await wait(200);
    return data;
  };

export { fetch, fetchMock };
