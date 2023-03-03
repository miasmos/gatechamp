import { SetterOrUpdater } from "recoil";
import { RouteState } from "../atom";

const jumpsSetter = (setter: SetterOrUpdater<RouteState>) => (jumps: number) =>
  setter((state) => ({
    ...state,
    jumps,
  }));

export default jumpsSetter;
