import { selectorFamily } from "recoil";
import { getWithResponse } from "../../../api";

const characterSelector = selectorFamily({
  key: "UserState:Character",
  get:
    ({ loggedIn, characterId }: { loggedIn: boolean; characterId: number }) =>
    async () => {
      if (!loggedIn) {
        return undefined;
      }

      const response = await getWithResponse("/api/character", {
        "x-character-id": characterId,
      });
      return response.data;
    },
});

export default characterSelector;
