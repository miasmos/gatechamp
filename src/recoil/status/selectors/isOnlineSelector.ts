import { selector } from "recoil";
import statusState from "../atom";

const isOnlineSelector = selector({
  key: "StatusState:IsOnline",
  get: ({ get }) => get(statusState).status.online,
});

export default isOnlineSelector;
