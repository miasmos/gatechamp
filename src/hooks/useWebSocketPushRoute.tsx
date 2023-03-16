import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useInterval } from "usehooks-ts";
import { WebSocketEvent, WebSocketEventType } from "../enum";
import {
  getPushRouteCooldownProgressSelector,
  getPushRouteProgressSelector,
} from "../recoil/route";
import routeState from "../recoil/route/atom";
import {
  activeCharacterSelector,
  isConnectedSelector,
  isSubscribedSelector,
} from "../recoil/user";
import usePushRoute from "./usePushRoute";
import useWebSocket from "./useWebSocket";

const deserializeEvent = (event: string) => {
  const [eventName, eventType, resourceId] = event.split(":");
  return { name: eventName, type: eventType, id: resourceId };
};

const serializeEvent = (id: number) => `${WebSocketEvent.PushRoute}::${id}`;

type PushRouteResponse = {
  inProgress: boolean;
  progress: number;
  cooldown: number;
};

function useWebSocketPushRoute() {
  const {
    pushRoute: { shouldPushRoute, route, cooldownDate },
  } = useRecoilValue(routeState);
  const pushRouteCooldownProgress = useRecoilValue(
    getPushRouteCooldownProgressSelector
  );
  const pushRouteProgress = useRecoilValue(getPushRouteProgressSelector);
  const { canPushRoute, setPushRoute } = usePushRoute();
  const isSubscribed = useRecoilValue(isSubscribedSelector);
  const activeCharacter = useRecoilValue(activeCharacterSelector);
  const isConnected = useRecoilValue(isConnectedSelector);

  const { sendEvent, receiveEvent, lastJsonMessage } = useWebSocket();

  useInterval(
    () => {
      const hasCooldown = cooldownDate! - Date.now() > 0;
      if (!hasCooldown) {
        setPushRoute({
          cooldownDate: undefined,
          didPushRoute: false,
          shouldPushRoute: false,
          isPushing: false,
          progress: 1,
        });
      }
    },
    typeof cooldownDate === "number" ? 1000 : null
  );

  useEffect(() => {
    if (canPushRoute && shouldPushRoute && isConnected && isSubscribed) {
      const eventId = serializeEvent(activeCharacter);
      const accessToken = Cookies.get("access_token");
      if (!accessToken) {
        return;
      }
      sendEvent(WebSocketEventType.OneTime, {
        event: eventId,
        data: { accessToken, route },
      });
      setPushRoute({ shouldPushRoute: false, didPushRoute: true });
    }
  }, [shouldPushRoute, canPushRoute, isConnected]);

  useEffect(() => {
    if (pushRouteProgress === 0 && pushRouteCooldownProgress === 1) {
      setPushRoute({ didPushRoute: false });
    }
  }, [pushRouteCooldownProgress, pushRouteProgress]);

  useEffect(() => {
    if (lastJsonMessage) {
      const message = receiveEvent(lastJsonMessage);
      if (!message) {
        return;
      }
      const { name } = deserializeEvent(message.event);
      if (name !== WebSocketEvent.PushRoute) {
        return;
      }

      const { progress, inProgress, cooldown }: PushRouteResponse =
        message.data;
      setPushRoute({
        progress: inProgress ? progress : 1,
        isPushing: inProgress,
        cooldownDate: cooldown,
      });
    }
  }, [lastJsonMessage]);
}

export default useWebSocketPushRoute;
export { deserializeEvent, serializeEvent };
