import { selector } from "recoil";
import userState from "../atom";

const isLoggedInSelector = selector({
  key: "UserState:HasStation",
  get: ({ get }) => get(userState).loggedIn,
});

export default isLoggedInSelector;
