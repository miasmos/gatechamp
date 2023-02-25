import { SetterOrUpdater } from "recoil";
import { RouteSecurity } from "../../../enum";
import { TripState } from "../atom";

const routeSafetySetter =
  (setter: SetterOrUpdater<TripState>) => (routeSafety: RouteSecurity) =>
    setter((state) => ({
      ...state,
      routeSafety,
    }));

export default routeSafetySetter;
