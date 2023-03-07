import { selector } from "recoil";
import userState from "../atom";

const activeCharacterSelector = selector({
  key: "UserState:ActiveCharacter",
  get: ({ get }) => get(userState).activeCharacter,
});

export default activeCharacterSelector;
