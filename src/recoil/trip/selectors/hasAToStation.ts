import { selector } from "recoil";
import tripState from "../atom";

const hasAToStation = selector({
  key: "TripState:HasAToStation",
  get: ({ get }) =>
    get(tripState).to.filter((value) => Boolean(value)).length > 0,
});

export default hasAToStation;
