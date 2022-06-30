import { io, Socket, SocketOptions, ManagerOptions } from "socket.io-client";
import { Modality, isNumber, State } from "../utils/utils";
import { MachineInterface } from "./machine";

interface Auth{
    type: string;
    machine_id: number;
    token: string;
}

export class MachineConnection{
    private readonly socket: Socket;
    private readonly machine:MachineInterface;

    constructor(serverURL: string, machine_id: number, machine: MachineInterface){
        let options: Partial<SocketOptions & ManagerOptions> = { 
            rejectUnauthorized : false,
            transports: ["websocket"],
            path: "/socket.io",
        }
        
        let auth: Auth = {
            type: "machine",
            machine_id: machine_id,
            token: "test"
        }
        
        options.auth = auth;
        this.socket = io(serverURL, options);
        
        this.machine = machine;

        console.log("Setup")
        this.socket.on("error", (error) => {
            console.error(error);
        });
        
        this.socket.on("connect", () => {
            console.log("Connected"); 
        });

        this.socket.on("disconnect", () => {
            console.log("Disconnected");
        });

        this.socket.on('pingpong', (msg) => {
            console.log("receive:", msg )
            this.socket.emit("pingpong", "machine pong");
        })

        this.socket.on('period', (msg)=>{
            let period = +msg;
            if(isNumber(period)){
                if(period >= 1000 && period <= 300000){
                    this.machine.setNewInterval(period)
                }else{
                    console.error("Period must be between 1000 and 300000 millis");
                }
            }else{
                console.error("The new received period is not a number");
            }
        })

        this.socket.on('modality', (msg) => {
            let mod: Modality = Modality[msg as keyof typeof Modality];
            if(mod !== undefined){
                this.machine.setNewModality(mod)

            }else{
                console.error("Not existing modality")
            }
        })

        this.socket.on('state', (msg) => {
            let st: State = State[msg as keyof typeof State];
            if(st !== undefined){
                this.machine.setNewState(st)

            }else{
                console.error("Not existing state")
            }
        })
    }

    public emit(topic: string, msg: string){
        this.socket.emit(topic, msg);
    }
}