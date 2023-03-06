import { selector } from "recoil";
import killsState from "../atom";

const getSubscriptionsSelector = selector({
  key: "KillState:Subscriptions",
  get: ({ get }) => get(killsState).subscriptions,
});

export default getSubscriptionsSelector;
