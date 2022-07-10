import {Server, Socket} from "socket.io";
import {Server as HttpServer} from "http";
import { makeErr, isNumber, State } from "../utils/utils";
import { JsonWebTokenError } from "jsonwebtoken";
import { DBService, DBService_mongo } from "../database/dbservice";
import { ILog } from "../database/models/log_schema";
const jwt = require("jsonwebtoken");
const db_service: DBService = new DBService_mongo();

let period: number = 60000;
export class SocketIOService {
  private readonly CLIENTS_ROOM = "client";
  private readonly MACHIES_ROOM = "machine";
  private static _instance: SocketIOService | undefined;
  private static server: Server | undefined;
  private readonly machinesSubscribers: Map<number, Set<string>>; // machine_id -> array of subscribed clients (their SocketIDs)
  private readonly clientsSubcribes: Map<string, number> // clientID -> machine_id
  private readonly EXCEPTION_CHANNEL = "exception";
  private static readonly AUTH: boolean = false;

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
        if(SocketIOService.AUTH){
          jwt.verify(socket.handshake.auth.token, process.env.SECRET, (err:JsonWebTokenError, authData:string) => {
            if(err && socket.handshake.auth.token != "machineToken"){
               socket.disconnect();
               console.log("Invalid Token")
            }else{
              console.log("Token is valid")
              // console.log(`A new connection of ${socket.handshake.auth.type} with id ${socket.id}`);
              // console.log('Presented token is', socket.handshake.auth.token);
            }
  
          })
        }

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
              this.unsubscribe(socket.id)
              if(!this.machinesSubscribers.has(obj.machine_id)){// if it is first subscription to this machine
                this.machinesSubscribers.set(obj.machine_id, new Set())
              }
              this.clientsSubcribes.set(socket.id, obj.machine_id)
              this.machinesSubscribers.get(obj.machine_id)?.add(socket.id)
              this.sendMessage(obj.machine_id, "subscribe", "")

            }else{
                this.sendBadRequest(socket)
            }
          }catch(err){
            this.sendBadRequest(socket)
          }
        })


        socket.on("machines/unsubscribe", (msg) => {
            this.unsubscribe(socket.id)
        })

        socket.on("clients/update", (msg) => {
          try{
            let obj = JSON.parse(msg);
            if(obj.machine_id && obj.machine_id >= 0 && obj.state){ 

              obj = checkAllarm(obj);
              db_service.addLog(obj).then((log:ILog) =>{
                //console.log(log)
              }).catch((error) => {
                  console.log(error);
              })

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
            console.log("modality channel -> msg: " + msg);

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

  private unsubscribe(socketId: string){
    let prevSubscribe = this.clientsSubcribes.get(socketId);
    if(prevSubscribe !== undefined){ 
      //remove previous subscription from  machines list
      this.machinesSubscribers.get(prevSubscribe)?.delete(socketId)
      this.clientsSubcribes.delete(socketId); 
    }
  }
}

function checkAllarm(obj: any): Object{
  let allarms: string[] = []
  if(obj.temperature > 80){
    obj.state = State[State.ALLARM];
    allarms.push("temperature");
  }else if(obj.machine_oil_level < 10){
    obj.state = State[State.ALLARM];
    allarms.push("machine_oil_level");
  }
  if(allarms.length > 0){
    obj.allarm = allarms

  }
  return obj;
}