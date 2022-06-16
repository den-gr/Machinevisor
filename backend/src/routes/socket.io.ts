import {Server, Socket} from "socket.io";
import {Server as HttpServer} from "http";

export class SocketIOService {
  private static _instance: SocketIOService | undefined;
  private static server: Server | undefined;

  private constructor() {
    // Private constructor ensures singleton instance
  }

  static instance(): SocketIOService {
    if (!this._instance) {
        this._instance = new SocketIOService();
    }
    return this._instance;
  }

  initialize(httpServer: HttpServer) {
    SocketIOService.server = new Server(httpServer);
    SocketIOService.server.on('connection', (socket : Socket) => {
        console.log('a user connected to socket');
        socket.on("pingpong", (msg) => {
            console.log( "Receive: ",  msg)
           
        })
        setInterval(() => socket.emit("pingpong","pip"), 5000)
        
        socket.emit("pingpong", "pin")
    });

    return SocketIOService.server;
  }

  ready() {
    return SocketIOService.server !== null;
  }

  private getServer(): Server {
    if (!SocketIOService.server) {
      throw new Error('IO server requested before initialization');
    }
    return SocketIOService.server;
  }

  sendMessage(roomId: string | string[], key: string, message: string) {
    this.getServer().to(roomId).emit(key, message)
  }

  emitAll(key: string, message: string) {
    this.getServer().emit(key, message)
  }

  getRooms() {
    return this.getServer().sockets.adapter.rooms;
  }
}
