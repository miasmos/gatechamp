import { selector } from "recoil";
import userState from "../atom";

const isConnectedSelector = selector({
  key: "UserState:IsConnected",
  get: ({ get }) => get(userState).isConnected,
});

export default isConnectedSelector;
