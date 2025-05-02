import { useState, useEffect, useCallback } from 'react';

interface WebSocketHook {
  lastMessage: MessageEvent | null;
  sendMessage: (message: any) => void;
  isConnected: boolean;
}

export const useWebSocket = (channel: string): WebSocketHook => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [lastMessage, setLastMessage] = useState<MessageEvent | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/${channel}`);

    ws.onopen = () => {
      setIsConnected(true);
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    ws.onmessage = (event) => {
      setLastMessage(event);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [channel]);

  const sendMessage = useCallback((message: any) => {
    if (socket && isConnected) {
      socket.send(JSON.stringify(message));
    }
  }, [socket, isConnected]);

  return { lastMessage, sendMessage, isConnected };
}; 