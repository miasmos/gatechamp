import { selector } from "recoil";
import killsState from "../atom";

const getIsSubscribedSelector = selector({
  key: "KillState:IsSubscribed",
  get: ({ get }) => get(killsState).subscriptions.length > 0,
});

export default getIsSubscribedSelector;
