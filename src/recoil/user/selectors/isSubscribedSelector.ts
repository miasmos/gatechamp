import { selector } from "recoil";
import userState from "../atom";

const isSubscribedSelector = selector({
  key: "UserState:IsSubscribed",
  get: ({ get }) => get(userState).isSubscribed,
});

export default isSubscribedSelector;
