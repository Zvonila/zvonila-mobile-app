import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type WSContextType = {
  sendMessage: (msg: string | object) => void;
  lastMessage: any;
  ready: boolean;
};

const WebSocketContext = createContext<WSContextType | null>(null);

export const useWebSocket = () => useContext(WebSocketContext)!;

export const WebSocketProvider = ({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const createConnection = () => {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WS connected");
        setReady(true);
      };

      ws.onmessage = (event) => {
        try {
          setLastMessage(JSON.parse(event.data));
          console.log("LAST MESSAGE: ", JSON.parse(event.data).data)
        } catch {
          setLastMessage(event.data);
        }
      };

      ws.onclose = () => {
        console.log("WS disconnected");
        setReady(false);
        // Авто-переподключение
        setTimeout(() => {
          console.log("WS reconnected")
          createConnection();
        }, 1500);
      };

      ws.onerror = (err) => {
        console.warn("WS error", err);
      };

      return ws
    }

    createConnection()

    return () => {
      if (wsRef.current) {
        console.log("WS Close")
        wsRef.current.close() 
      }
    };
  }, [url]);

  const sendMessage = (msg: string | object) => {
    const payload = typeof msg === "string" ? msg : JSON.stringify(msg);
    wsRef.current?.send(payload);
  };

  return (
    <WebSocketContext.Provider value={{ sendMessage, lastMessage, ready }}>
      {children}
    </WebSocketContext.Provider>
  );
};
