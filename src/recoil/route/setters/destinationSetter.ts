import { SetterOrUpdater } from "recoil";
import { RouteState } from "../atom";

const destinationSetter =
  (setter: SetterOrUpdater<RouteState>) => (destination: number) =>
    setter((state) => ({
      ...state,
      destination,
    }));

export default destinationSetter;
