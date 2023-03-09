import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { WebSocketEvent } from "../enum";
import {
  getIsSubscribedSelector,
  isSubscribedSetter,
  statusSetter,
} from "../recoil/status";
import statusState from "../recoil/status/atom";
import {
  activeCharacterSelector,
  isConnectedSelector,
  isLoggedInSelector,
} from "../recoil/user";
import useWebSocket from "./useWebSocket";

const deserializeEvent = (event: string) => {
  const [eventName, eventType, resourceId] = event.split(":");
  return { name: eventName, type: eventType, id: resourceId };
};

const serializeEvent = (name: WebSocketEvent.Status, id: number) =>
  `${name}::${id}`;

function useStatusWebsocket() {
  const loggedIn = useRecoilValue(isLoggedInSelector);
  const isSubscribed = useRecoilValue(getIsSubscribedSelector);
  const isConnected = useRecoilValue(isConnectedSelector);
  const activeCharacter = useRecoilValue(activeCharacterSelector);
  const setStatusState = useSetRecoilState(statusState);
  const setStatus = statusSetter(setStatusState);
  const setIsSubscribed = isSubscribedSetter(setStatusState);

  const { sendEvent, receiveEvent, lastJsonMessage } = useWebSocket();

  useEffect(() => {
    if (!isConnected) {
      setIsSubscribed(false);
      return;
    }

    if (loggedIn) {
      if (!isSubscribed) {
        const eventId = serializeEvent(WebSocketEvent.Status, activeCharacter);
        sendEvent("subscribe", { event: eventId });
        setIsSubscribed(true);
      }
    }
    if (!loggedIn) {
      if (isSubscribed) {
        const eventId = serializeEvent(WebSocketEvent.Status, activeCharacter);
        sendEvent("unsubscribe", { event: eventId });
        setIsSubscribed(false);
      }
    }
  }, [loggedIn, isSubscribed, isConnected]);

  useEffect(() => {
    if (lastJsonMessage) {
      const message = receiveEvent(lastJsonMessage);
      if (!message) {
        return;
      }
      const { name } = deserializeEvent(message.event);
      if (name !== WebSocketEvent.Status) {
        return;
      }

      setStatus(message.data);
    }
  }, [lastJsonMessage]);
}

export default useStatusWebsocket;
export { deserializeEvent, serializeEvent };
