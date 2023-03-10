import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { WebSocketEvent, WebSocketEventType } from "../enum";
import {
  addSubscriptionsSetter,
  clearSubscriptionsSetter,
  removeSubscriptionsSetter,
  solarSystemSetter,
  stargateSetter,
} from "../recoil/kills";
import killsState from "../recoil/kills/atom";
import { isLoggedInSelector, isConnectedSelector } from "../recoil/user";
import useWebSocket from "./useWebSocket";

const deserializeEvent = (event: string) => {
  const [eventName, eventType, resourceId] = event.split(":");
  return { name: eventName, type: eventType, id: resourceId };
};

const serializeEvent = (
  name: WebSocketEvent.Kills,
  type: "solar-system" | "stargate",
  id: number
) => `${name}:${type}:${id}`;

function useWebsocketKills() {
  const loggedIn = useRecoilValue(isLoggedInSelector);
  const isConnected = useRecoilValue(isConnectedSelector);
  const setKillsState = useSetRecoilState(killsState);
  const { addSubscription, removeSubscription } = useRecoilValue(killsState);
  const setAddSubscriptions = addSubscriptionsSetter(setKillsState);
  const setRemoveSubscriptions = removeSubscriptionsSetter(setKillsState);
  const clearSubscriptions = clearSubscriptionsSetter(setKillsState);
  const setSolarSystem = solarSystemSetter(setKillsState);
  const setStargate = stargateSetter(setKillsState);

  const { sendEvent, receiveEvent, lastJsonMessage } = useWebSocket();

  useEffect(() => {
    clearSubscriptions();
  }, []);

  useEffect(() => {
    if (removeSubscription.length > 0) {
      removeSubscription.forEach((eventId) =>
        sendEvent(WebSocketEventType.Unsubscribe, { event: eventId })
      );
      setRemoveSubscriptions(removeSubscription);
    }
  }, [removeSubscription]);

  useEffect(() => {
    if (addSubscription.length > 0) {
      addSubscription.forEach((eventId) =>
        sendEvent(WebSocketEventType.Subscribe, { event: eventId })
      );
      setAddSubscriptions(addSubscription);
    }
  }, [addSubscription]);

  useEffect(() => {
    if (lastJsonMessage) {
      const message = receiveEvent(lastJsonMessage);
      if (!message) {
        return;
      }
      const { name, type, id } = deserializeEvent(message.event);

      if (name !== WebSocketEvent.Kills) {
        return;
      }

      switch (type) {
        case "solar-system":
          setSolarSystem(Number(id), message.data);
          break;
        case "stargate":
          setStargate(Number(id), message.data);
          break;
        default:
          console.error("got unknown eventType in Kills websocket:", type);
          break;
      }
    }
  }, [lastJsonMessage]);
}

export default useWebsocketKills;
export { deserializeEvent, serializeEvent };
