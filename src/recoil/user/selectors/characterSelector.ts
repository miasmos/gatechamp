import { selectorFamily } from "recoil";
import { getWithResponse } from "../../../api";

const characterSelector = selectorFamily({
  key: "UserState:Character",
  get:
    ({ loggedIn, characterId }: { loggedIn: boolean; characterId: number }) =>
    async () => {
      if (!loggedIn) {
        return { name: "" };
      }

      try {
        const response = await getWithResponse("/api/character", {
          "x-character-id": characterId,
        });
        return response.data;
      } catch (error: any) {
        console.error(error);
        if (error?.response) {
          if (error.response.status !== 401) {
            throw error;
          }
        }
      }
      return { name: "" };
    },
});

export default characterSelector;
