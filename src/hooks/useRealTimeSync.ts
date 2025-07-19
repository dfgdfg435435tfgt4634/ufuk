import { useEffect, useState, useCallback } from 'react';
import { socketManager } from '../lib/socket';
import { Socket } from 'socket.io-client';

interface ConnectionStatus {
  isConnected: boolean;
  isReconnecting: boolean;
  error: string | null;
}

export function useRealTimeSync(isAdmin: boolean = false) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    isConnected: false,
    isReconnecting: false,
    error: null,
  });

  useEffect(() => {
    const socketInstance = socketManager.connect(isAdmin);
    setSocket(socketInstance);

    const handleConnect = () => {
      setConnectionStatus({
        isConnected: true,
        isReconnecting: false,
        error: null,
      });
    };

    const handleDisconnect = () => {
      setConnectionStatus(prev => ({
        ...prev,
        isConnected: false,
        isReconnecting: true,
      }));
    };

    const handleConnectError = (error: Error) => {
      setConnectionStatus({
        isConnected: false,
        isReconnecting: false,
        error: error.message,
      });
    };

    const handleReconnect = () => {
      setConnectionStatus({
        isConnected: true,
        isReconnecting: false,
        error: null,
      });
    };

    socketInstance.on('connect', handleConnect);
    socketInstance.on('disconnect', handleDisconnect);
    socketInstance.on('connect_error', handleConnectError);
    socketInstance.on('reconnect', handleReconnect);

    return () => {
      socketInstance.off('connect', handleConnect);
      socketInstance.off('disconnect', handleDisconnect);
      socketInstance.off('connect_error', handleConnectError);
      socketInstance.off('reconnect', handleReconnect);
    };
  }, [isAdmin]);

  const subscribe = useCallback((event: string, callback: (data: any) => void) => {
    if (socket) {
      socket.on(event, callback);
      return () => socket.off(event, callback);
    }
    return () => {};
  }, [socket]);

  const emit = useCallback((event: string, data?: any) => {
    if (socket?.connected) {
      socket.emit(event, data);
    }
  }, [socket]);

  return {
    socket,
    connectionStatus,
    subscribe,
    emit,
  };
}