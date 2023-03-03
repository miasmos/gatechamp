import { SetterOrUpdater } from "recoil";
import { RouteState } from "../atom";

const originNameSetter =
  (setter: SetterOrUpdater<RouteState>) => (originName: string) =>
    setter((state) => ({
      ...state,
      originName,
    }));

export default originNameSetter;
