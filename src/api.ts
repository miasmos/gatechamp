import Axios from "axios";
import Cookies from "js-cookie";
import { EVE_TRADE_PLUS_DOMAIN } from "./constants";
import { wait } from "./util/promise";

const ApiClient = Axios.create({
  baseURL: EVE_TRADE_PLUS_DOMAIN,
  timeout: 30000,
});

const getWithResponse = (
  url: string,
  headers: Record<string, any> = {},
  timeout = 30000
) =>
  ApiClient.get(url, {
    headers,
    withCredentials: true,
    timeout,
  });
const get = (url: string, headers: Record<string, any> = {}, timeout = 30000) =>
  getWithResponse(
    url,
    {
      ...headers,
      "x-character-id": Cookies.get("active_character_id"),
    },
    timeout
  ).then((response) => response.data);
const post =
  <T>(data: T, timeout = 30000) =>
  (url: string) =>
    ApiClient.post(url, data, {
      withCredentials: true,
      timeout,
      headers: {
        "x-character-id": Cookies.get("active_character_id"),
      },
    }).then((response) => response.data);

const fetchMock =
  <T>(data: T) =>
  async () => {
    await wait(200);
    return data;
  };

export { get, post, getWithResponse, fetchMock };
