import { selector } from "recoil";
import statusState from "../atom";

const hasLocationSelector = selector({
  key: "StatusState:HasLocation",
  get: ({ get }) => get(statusState).status.location.solarSystemID !== 0,
});

export default hasLocationSelector;
