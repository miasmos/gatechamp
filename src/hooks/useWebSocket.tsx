import { useEffect } from "react";
import useWebSocketLib, { ReadyState } from "react-use-websocket";
import { EVE_TRADE_PLUS_WEBSOCKET_DOMAIN } from "../constants";

function useWebSocket() {
  const { sendMessage, lastMessage, readyState } = useWebSocketLib(
    EVE_TRADE_PLUS_WEBSOCKET_DOMAIN
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const sendJson = (event: string, data: any) =>
    sendMessage(JSON.stringify([event, data]));
  const receiveJson = (event: MessageEvent) => {
    try {
      const [eventName, data] = JSON.parse(event.data);
      return { event: eventName, data };
    } catch {
      console.error("Got malformed json");
    }
  };

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendJson("ping", { data: true });
    }
  }, [readyState]);

  if (lastMessage) {
    console.log(receiveJson(lastMessage!));
  }
}

export default useWebSocket;
