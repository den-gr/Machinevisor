import {Server, Socket} from "socket.io";
import {Server as HttpServer} from "http";
import { makeErr, isNumber, State } from "../utils/utils";

let period: number = 20000;
export class SocketIOService {
  private readonly CLIENTS_ROOM = "client";
  private readonly MACHIES_ROOM = "machine";
  private static _instance: SocketIOService | undefined;
  private static server: Server | undefined;
  private readonly machinesSubscribers: Map<number, Set<string>>; // machine_id -> array of subscribed clients (their SocketIDs)
  private readonly clientsSubcribes: Map<string, number> // clientID -> machine_id
  private readonly EXCEPTION_CHANNEL = "exception";

  private constructor() {
    this.machinesSubscribers = new Map();
    this.clientsSubcribes = new Map();
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
            if(isNumber(key)){
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
          try{
            let obj = JSON.parse(msg);
            if(obj.machine_id && obj.period){
              this.sendMessage(obj.machine_id, "period", obj.period)
            }else{
              this.sendBadRequest(socket)
            }
          }catch(err){
            this.sendBadRequest(socket)
          }
        })

        socket.on("machines/subscribe", (msg) => {
          try{
            let obj: any = JSON.parse(msg);
            if((obj.machine_id || obj.machine_id == 0) && obj.machine_id >= 0){
              let prevSubscribe = this.clientsSubcribes.get(socket.id);
              if(prevSubscribe !== undefined){ 
                //remove previous subscription from  machines list
                this.machinesSubscribers.get(prevSubscribe)?.delete(socket.id) 
              }
              if(!this.machinesSubscribers.has(obj.machine_id)){// if it is first subscription to this machine
                this.machinesSubscribers.set(obj.machine_id, new Set())
              }
              this.clientsSubcribes.set(socket.id, obj.machine_id)
              this.machinesSubscribers.get(obj.machine_id)?.add(socket.id)
            }else{
                this.sendBadRequest(socket)
            }
          }catch(err){
            this.sendBadRequest(socket)
          }
          // console.log(this.machinesSubscribers)
          // console.log(this.clientsSubcribes)
        })

        socket.on("clients/update", (msg) => {
          try{
            let obj = JSON.parse(msg);
            //TODO save to database all new updates (AFTER checkAllarm)
            if(obj.machine_id && obj.machine_id >= 0 && obj.state){ 
              obj = checkAllarm(obj);
              if(this.machinesSubscribers.has(0)){ // send updates to the clients that want to have updates from all machines
                this.machinesSubscribers.get(0)?.forEach((e: string) => this.sendMessage(e, "update", JSON.stringify(obj)))
              }
              if(this.machinesSubscribers.has(obj.machine_id)){
                this.machinesSubscribers.get(obj.machine_id)?.forEach((e: string) => this.sendMessage(e, "update", JSON.stringify(obj)))
              }
            }else{
                this.sendBadRequest(socket)
            }
          }catch(err){
            this.sendBadRequest(socket)
          }
         
        })

        socket.on("machines/modality", (msg) => {
          try{
            let obj = JSON.parse(msg);
            if(obj.machine_id && obj.machine_id >= 0 && obj.modality){
              this.sendMessage(obj.machine_id, "modality", obj.modality)
            }else{
                this.sendBadRequest(socket)
            }
          }catch(err){
            this.sendBadRequest(socket)
          }
        })

        socket.on("machines/state", (msg) => {
          try{
            let obj = JSON.parse(msg);
            if(obj.machine_id && obj.machine_id >= 0 && obj.state){
              this.sendMessage(obj.machine_id, "state", obj.state)
            }else{
                this.sendBadRequest(socket)
            }
          }catch(err){
            this.sendBadRequest(socket)
          }
        })

        socket.on("disconnect", () => console.log(`Disconnection of ${socket.handshake.auth.type} with id ${socket.id}`))

    });

    function loop(service: SocketIOService){
      // console.log("rooms:", service.getRooms())
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

  private sendBadRequest(socket: Socket){
    socket.emit(this.EXCEPTION_CHANNEL, makeErr("Bad request", "Some field is missed"))
  }
}

function checkAllarm(obj: any): Object{
  if(obj.temperature > 80){
    console.log("before", obj.state)
    obj.state = State[State.ALLARM];
    obj.allarm = ["temperature"]
    console.log("after", obj.state)

  }
  return obj;
}