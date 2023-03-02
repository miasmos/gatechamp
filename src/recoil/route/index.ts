import atom from "./atom";
import { RouteState } from "./atom";
import addAvoidSystemSetter from "./setters/addAvoidSystemSetter";
import avoidGateCampsSetter from "./setters/avoidGateCampsSetter";
import avoidHicsSetter from "./setters/avoidHicsSetter";
import avoidSmartBombsSetter from "./setters/avoidSmartBombsSetter";
import deleteAvoidSystemSetter from "./setters/deleteAvoidSystemSetter";
import destinationSetter from "./setters/destinationSetter";
import originSetter from "./setters/originSetter";

export default atom;
export {
  addAvoidSystemSetter,
  avoidGateCampsSetter,
  avoidHicsSetter,
  avoidSmartBombsSetter,
  deleteAvoidSystemSetter,
  destinationSetter,
  originSetter,
};
export type { RouteState };
