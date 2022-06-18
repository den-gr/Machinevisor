import {Server, Socket} from "socket.io";
import {Server as HttpServer} from "http";
import { getServers } from "dns";
const utils = require('../utils/utils');

let period: number = 10000;
export class SocketIOService {
  private readonly CLIENTS_ROOM = "client";
  private readonly MACHIES_ROOM = "machine";
  private static _instance: SocketIOService | undefined;
  private static server: Server | undefined;
  // private machinesRooms: Map<number, string>;

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
        console.log(`A new connection of ${socket.handshake.auth.type} with id ${socket.id}`);
        console.log('Presented token is', socket.handshake.auth.token);
        if(socket.handshake.auth.type === this.CLIENTS_ROOM || socket.handshake.query.type === this.CLIENTS_ROOM){
          // socket.leave(socket.id)
          socket.join(this.CLIENTS_ROOM)
          let keys: number[] = [];
          this.getRooms().forEach((value: any, key: any) => {
            if(utils.isNumber(key)){
              keys.push(key)
            }
          });
          console.log("all keys", keys)

        }else if(socket.handshake.auth.type === this.MACHIES_ROOM){
          socket.leave(socket.id)
          socket.join(this.MACHIES_ROOM)
          socket.join(socket.handshake.auth.machine_id)
        }
        socket.on("pingpong", (msg) => {
            console.log( "Receive: ",  msg)
        })
        
        socket.on("machines/period", (msg) => {
            this.sendMessage(msg.machine_id, "period", msg.period)
        })

        socket.on("disconnect", () =>console.log(`Disconnection of ${socket.handshake.auth.type} with id ${socket.id}`))

    });

    function loop(service: SocketIOService){
      console.log("rooms:", service.getRooms())
      if(SocketIOService.server !== undefined){
        service.sendMessage(service.CLIENTS_ROOM, "pingpong","ping to client with period "  + period)
        service.sendMessage(service.MACHIES_ROOM, "pingpong","ping to machines with period " + period)
        setTimeout(loop, period, service)
      }
    }
    loop(this)

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
