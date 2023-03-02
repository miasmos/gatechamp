import { selector } from "recoil";
import shipsState, { Ship } from "../atom";

const getSelectedShipsSelector = selector({
  key: "ShipsState:GetSelectedShips",
  get: ({ get }) => {
    const { ships, shipsSelected } = get(shipsState);
    const result = shipsSelected.reduce<Ship[]>((prev, current, index) => {
      if (current) {
        prev.push(ships[index]);
      }
      return prev;
    }, []);
    return result;
  },
});

export default getSelectedShipsSelector;
