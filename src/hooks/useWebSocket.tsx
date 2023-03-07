import { useEffect } from "react";
import useWebSocketLib, { ReadyState } from "react-use-websocket";
import { useSetRecoilState } from "recoil";
import { EVE_TRADE_PLUS_WEBSOCKET_DOMAIN } from "../constants";
import { isConnectedSetter } from "../recoil/user";
import userState from "../recoil/user/atom";

function useWebSocket() {
  const setUserState = useSetRecoilState(userState);
  const setIsConnected = isConnectedSetter(setUserState);
  const { sendJsonMessage, lastMessage, lastJsonMessage, readyState } =
    useWebSocketLib(EVE_TRADE_PLUS_WEBSOCKET_DOMAIN, {
      share: true,
      shouldReconnect: () => true,
    });

  useEffect(() => {
    setIsConnected(readyState === ReadyState.OPEN);
  }, [readyState]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const sendEvent = (event: string, data: any) =>
    sendJsonMessage([event, data]);
  const receiveEvent = (event: any) => {
    if (!Array.isArray(event) || event.length < 2) {
      return undefined;
    }
    try {
      const [eventName, data] = event;
      return { event: eventName, data };
    } catch {
      console.error("Got malformed json");
    }
  };

  return {
    sendEvent,
    receiveEvent,
    lastMessage,
    lastJsonMessage,
    readyState,
    connectionStatus,
  };
}

export default useWebSocket;
