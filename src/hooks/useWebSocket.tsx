import { useEffect } from "react";
import useWebSocketLib, { ReadyState } from "react-use-websocket";
import { useSetRecoilState } from "recoil";
import { EVE_TRADE_PLUS_WEBSOCKET_DOMAIN } from "../constants";
import { isConnectedSetter } from "../recoil/user";
import userState from "../recoil/user/atom";

function useWebSocket() {
  const setUserState = useSetRecoilState(userState);
  const setIsConnected = isConnectedSetter(setUserState);
  const { sendMessage, lastMessage, readyState } = useWebSocketLib(
    EVE_TRADE_PLUS_WEBSOCKET_DOMAIN,
    { share: true, shouldReconnect: () => true }
  );

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

  const sendJson = (event: string, data: any) =>
    sendMessage(JSON.stringify([event, data]));
  const receiveJson = (event: MessageEvent | null) => {
    if (!event) {
      return null;
    }
    try {
      const [eventName, data] = JSON.parse(event.data);
      return { event: eventName, data };
    } catch {
      console.error("Got malformed json");
    }
  };

  return {
    sendJson,
    lastMessage: receiveJson(lastMessage),
    readyState,
    connectionStatus,
  };
}

export default useWebSocket;
