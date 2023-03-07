import { SetterOrUpdater } from "recoil";
import { Character, UserState } from "../atom";

const characterSetter =
  (setter: SetterOrUpdater<UserState>) =>
  (nextCharacter: Character, characterId: number) =>
    setter(({ character, ...state }) => ({
      ...state,
      character: { ...character, [characterId.toString()]: nextCharacter },
    }));

export default characterSetter;
