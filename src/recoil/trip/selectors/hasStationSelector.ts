import { selector } from "recoil";
import tripState from "../atom";

const hasToStation = selector({
  key: "TripState:HasStation",
  get: ({ get }) =>
    get(tripState).to.some((value) => Boolean(value)) &&
    get(tripState).from.some((value) => Boolean(value)),
});

export default hasToStation;
