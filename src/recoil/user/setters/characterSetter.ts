import { SetterOrUpdater } from "recoil";
import { Character, UserState } from "../atom";

const characterSetter =
  (setter: SetterOrUpdater<UserState>) => (nextCharacter: Character) =>
    setter(({ character, ...state }) => ({
      ...state,
      activeCharacter: nextCharacter,
      character: {
        ...character,
        [nextCharacter.character_id.toString()]: nextCharacter,
      },
    }));

export default characterSetter;
