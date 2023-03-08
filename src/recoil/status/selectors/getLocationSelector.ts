import { selector } from "recoil";
import statusState from "../atom";

const getLocationSelector = selector({
  key: "StatusState:GetLocation",
  get: ({ get }) => get(statusState).status.location,
});

export default getLocationSelector;
