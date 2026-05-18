import { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

export const useWebSocket = (channel: string, onUpdate: (data: any) => void) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // WebSocket bağlantısı oluştur
    const socket = io('http://localhost:5000', {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log(`✓ WebSocket bağlandı: ${socket.id}`);
      
      // Kanal abone ol
      socket.emit('subscribe', { type: channel });
    });

    socket.on('subscribed', (data) => {
      console.log(`📊 ${data.type} kanalına abone olundu`);
    });

    // Kanalına göre dinle
    const eventMap: Record<string, string> = {
      energy: 'energy:update',
      water: 'water:update',
      alerts: 'alert:update',
      dashboard: 'dashboard:update',
    };

    const eventName = eventMap[channel] || `${channel}:update`;
    socket.on(eventName, (data) => {
      console.log(`🔄 ${channel} güncellemesi alındı:`, data);
      onUpdate(data);
    });

    socket.on('disconnect', () => {
      console.log('✗ WebSocket bağlantısı kesildi');
    });

    socket.on('error', (error) => {
      console.error('WebSocket hatası:', error);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [channel, onUpdate]);

  return socketRef.current;
};

export default useWebSocket;
