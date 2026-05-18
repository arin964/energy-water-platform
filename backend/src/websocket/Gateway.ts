import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';

export class WebSocketGateway {
  private io: SocketIOServer;

  constructor(server: HTTPServer) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: ['http://localhost:3001', 'http://localhost:3000'],
        credentials: true,
      },
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    this.io.on('connection', (socket) => {
      console.log(`✓ WebSocket bağlandı: ${socket.id}`);

      // İstemci bağlantı verilerini ister
      socket.on('subscribe', (data: { type: string }) => {
        console.log(`📊 Subscribe: ${data.type}`);
        socket.join(`channel:${data.type}`);
        socket.emit('subscribed', { success: true, type: data.type });
      });

      socket.on('unsubscribe', (data: { type: string }) => {
        console.log(`🚪 Unsubscribe: ${data.type}`);
        socket.leave(`channel:${data.type}`);
      });

      socket.on('disconnect', () => {
        console.log(`✗ WebSocket bağlantısı kesildi: ${socket.id}`);
      });
    });
  }

  // Veri güncelleme olaylarını broadcast et
  public broadcastEnergyUpdate(data: any) {
    this.io.to('channel:energy').emit('energy:update', {
      timestamp: new Date(),
      data,
    });
  }

  public broadcastWaterUpdate(data: any) {
    this.io.to('channel:water').emit('water:update', {
      timestamp: new Date(),
      data,
    });
  }

  public broadcastAlertUpdate(data: any) {
    this.io.to('channel:alerts').emit('alert:update', {
      timestamp: new Date(),
      data,
    });
  }

  public broadcastDashboardUpdate(data: any) {
    this.io.to('channel:dashboard').emit('dashboard:update', {
      timestamp: new Date(),
      data,
    });
  }
}

export default WebSocketGateway;
