import { selector } from "recoil";
import statusState from "../atom";

const getIsSubscribedSelector = selector({
  key: "StatusState:IsSubscribed",
  get: ({ get }) => get(statusState).isSubscribed,
});

export default getIsSubscribedSelector;
