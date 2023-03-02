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
};
export type { RouteState };
