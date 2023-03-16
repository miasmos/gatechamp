import { selector } from "recoil";
import userState from "../atom";

const characterSelector = selector({
  key: "UserState:Character",
  get: ({ get }) => get(userState).activeCharacter,
});

export default characterSelector;
