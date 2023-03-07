import { selector } from "recoil";
import userState from "../atom";

const characterSelector = selector({
  key: "UserState:Character",
  get: ({ get }) => {
    const { activeCharacter, character } = get(userState);
    if (!activeCharacter || !(activeCharacter.toString() in character)) {
      return {
        name: "",
      };
    }
    return character[activeCharacter.toString()];
  },
});

export default characterSelector;
