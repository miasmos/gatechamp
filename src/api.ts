import Axios from "axios";
import Cookies from "js-cookie";
import { APP_API_DOMAIN } from "./constants";
import { wait } from "./util/promise";

const ApiClient = Axios.create({
  baseURL: APP_API_DOMAIN,
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
  getWithResponse(url, {}, timeout).then((response) => response.data);
const post =
  <T>(data: T, timeout = 30000) =>
  (url: string) =>
    ApiClient.post(url, data, {
      withCredentials: true,
      timeout,
    }).then((response) => response.data);

const fetchMock =
  <T>(data: T) =>
  async () => {
    await wait(200);
    return data;
  };

export { get, post, getWithResponse, fetchMock };
