import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  addSubscriptionsSetter,
  clearSubscriptionsSetter,
  removeSubscriptionsSetter,
  solarSystemSetter,
  stargateSetter,
} from "../recoil/kills";
import killsState from "../recoil/kills/atom";
import useWebSocket from "./useWebSocket";

const deserializeEvent = (event: string) => {
  const [eventName, eventType, resourceId] = event.split(":");
  return { name: eventName, type: eventType, id: resourceId };
};

const serializeEvent = (
  name: "kills",
  type: "solar-system" | "stargate",
  id: number
) => `${name}:${type}:${id}`;

function useKillsWebsocket() {
  const setKillsState = useSetRecoilState(killsState);
  const { addSubscription, removeSubscription } = useRecoilValue(killsState);
  const setAddSubscriptions = addSubscriptionsSetter(setKillsState);
  const setRemoveSubscriptions = removeSubscriptionsSetter(setKillsState);
  const clearSubscriptions = clearSubscriptionsSetter(setKillsState);
  const setSolarSystem = solarSystemSetter(setKillsState);
  const setStargate = stargateSetter(setKillsState);

  const { sendJson, lastMessage } = useWebSocket();

  useEffect(() => {
    clearSubscriptions();
  }, []);

  useEffect(() => {
    if (addSubscription.length > 0) {
      addSubscription.forEach((eventId) =>
        sendJson("subscribe", { event: eventId })
      );
      setAddSubscriptions(addSubscription);
    }
  }, [addSubscription]);

  useEffect(() => {
    if (removeSubscription.length > 0) {
      removeSubscription.forEach((eventId) =>
        sendJson("unsubscribe", { event: eventId })
      );
      setRemoveSubscriptions(removeSubscription);
    }
  }, [removeSubscription]);

  useEffect(() => {
    if (lastMessage) {
      const { event, data } = lastMessage;
      const { name, type, id } = deserializeEvent(event);

      console.log("got message", lastMessage);

      if (name !== "kills") {
        return;
      }

      switch (type) {
        case "solar-system":
          setSolarSystem(Number(id), data);
          break;
        case "stargate":
          setStargate(Number(id), data);
          break;
        default:
          console.error("got unknown eventType in Kills websocket:", type);
          break;
      }
    }
  }, [lastMessage]);
}

export default useKillsWebsocket;
export { deserializeEvent, serializeEvent };
