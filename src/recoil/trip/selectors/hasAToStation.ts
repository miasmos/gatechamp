import { selector } from "recoil";
import tripState from "../atom";

const hasAToStation = selector({
  key: "TripState:HasAToStation",
  get: ({ get }) => {
    const state = get(tripState);
    return state.to.filter((value) => Boolean(value)).length > 0;
  },
});

export default hasAToStation;
