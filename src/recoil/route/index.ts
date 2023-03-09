import atom from "./atom";
import { RouteState } from "./atom";
import addAvoidSystemSetter from "./setters/addAvoidSystemSetter";
import avoidGateCampSetter from "./setters/avoidGateCampSetter";
import avoidEntryGateCampSetter from "./setters/avoidEntryGateCampSetter";
import avoidHicsSetter from "./setters/avoidHicsSetter";
import avoidSmartBombsSetter from "./setters/avoidSmartBombsSetter";
import deleteAvoidSystemSetter from "./setters/deleteAvoidSystemSetter";
import destinationSetter from "./setters/destinationSetter";
import originSetter from "./setters/originSetter";
import jumpsSetter from "./setters/jumpsSetter";
import originNameSetter from "./setters/originNameSetter";
import destinationNameSetter from "./setters/destinationNameSetter";
import getJumpsSelector from "./selectors/getJumpsSelector";
import getIsUsingMyLocationSelector from "./selectors/getIsUsingMyLocationSelector";
import isUsingMyLocationSetter from "./setters/isUsingMyLocationSetter";
import pushedRouteIdSetter from "./setters/pushedRouteIdSetter";
import routeSetter from "./setters/routeSetter";
import clearRouteSetter from "./setters/clearRouteSetter";

export default atom;
export {
  addAvoidSystemSetter,
  avoidEntryGateCampSetter,
  avoidGateCampSetter,
  avoidHicsSetter,
  avoidSmartBombsSetter,
  deleteAvoidSystemSetter,
  destinationSetter,
  originSetter,
  originNameSetter,
  destinationNameSetter,
  jumpsSetter,
  isUsingMyLocationSetter,
  pushedRouteIdSetter,
  routeSetter,
  clearRouteSetter,
};
export { getJumpsSelector, getIsUsingMyLocationSelector };
export type { RouteState };
