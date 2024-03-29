import atom from "./atom";
import getSolarSystemSelector from "./selectors/getSolarSystemSelector";
import getStargateSelector from "./selectors/getStargateSelector";
import solarSystemSetter from "./setters/solarSystemSetter";
import stargateSetter from "./setters/stargateSetter";
import getSubscriptionsSelector from "./selectors/getSubscriptionsSelector";
import getIsSubscribedSelector from "./selectors/getIsSubscribedSelector";
import getTitleSequenceSelector from "./selectors/getTitleSequenceSelector";
import {
  addSubscriptionsSetter,
  removeSubscriptionsSetter,
  clearSubscriptionsSetter,
} from "./setters/subscriptionsSetter";

export default atom;
export {
  getSolarSystemSelector,
  getStargateSelector,
  getSubscriptionsSelector,
  getIsSubscribedSelector,
  getTitleSequenceSelector,
};
export {
  solarSystemSetter,
  stargateSetter,
  addSubscriptionsSetter,
  removeSubscriptionsSetter,
  clearSubscriptionsSetter,
};
