import { selector } from "recoil";
import shipsState from "../atom";

const getAreAllShipsSelected = selector({
  key: "ShipsState:AreAllShipSelected",
  get: ({ get }) => {
    const { shipsSelected } = get(shipsState);

    return shipsSelected.every((value: boolean) => value);
  },
});

export default getAreAllShipsSelected;
