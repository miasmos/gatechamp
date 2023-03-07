import Axios from "axios";
import Cookies from "js-cookie";
import { EVE_TRADE_PLUS_DOMAIN } from "./constants";
import { wait } from "./util/promise";

const ApiClient = Axios.create({
  baseURL: EVE_TRADE_PLUS_DOMAIN,
  timeout: 60000,
});

const getWithResponse = (url: string, headers: Record<string, any> = {}) =>
  ApiClient.get(url, {
    headers,
    withCredentials: true,
  });
const get = (url: string, headers: Record<string, any> = {}) =>
  getWithResponse(url, {
    ...headers,
    "x-character-id": Cookies.get("active_character_id"),
  }).then((response) => response.data);
const post =
  <T>(data: T) =>
  (url: string) =>
    ApiClient.post(url, data, {
      withCredentials: true,
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
