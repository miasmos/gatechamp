import { SetterOrUpdater } from "recoil";
import { RouteState } from "../atom";

const destinationNameSetter =
  (setter: SetterOrUpdater<RouteState>) => (destinationName: string) =>
    setter((state) => ({
      ...state,
      destinationName,
    }));

export default destinationNameSetter;
