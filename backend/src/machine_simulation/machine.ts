import { io, Socket, connect, SocketOptions, ManagerOptions } from "socket.io-client";
import { Modality } from "src/database/models/machine_schema";
const utils = require('../utils/utils');

enum State{
    RUNNING, 
}

export class MachineSimulation implements MachineInterface{
    private static DEFAULT_PERIOD = 10000 + Math.random() * 1000;
    private readonly machine_id: number;
    private readonly conn: MachineConnection;
    private reportLoop;

    constructor(serverURL: string, machine_id: number){
        this.conn = new MachineConnection(serverURL, machine_id, this);
        this.machine_id = machine_id;
        this.reportLoop =  setInterval(this.sendReport, MachineSimulation.DEFAULT_PERIOD, this.conn, this);
    }

    public createReport(): Object{
        let report: {[key: string]: any } = {};
        report.machine_id = this.machine_id;
        report.timestamp = new Date();
        return report;
    }

    public sendReport(conn: MachineConnection, self: MachineSimulation){
        conn.emit("pingpong", JSON.stringify(self.createReport()))
    }

    public setNewInterval(newPeriod: number){
        clearInterval(this.reportLoop);
        this.reportLoop = setInterval(this.sendReport, newPeriod, this.conn, this);
    }
}


class MachineConnection{
    private socket: Socket;
    private options: Partial<SocketOptions & ManagerOptions> = { 
        rejectUnauthorized : false,
        transports: ["websocket"],
        path: "/socket.io",
    }
    private readonly machine:MachineInterface;

    constructor(serverURL: string, machine_id: number, machine: MachineInterface){
        let auth: Auth = {
            type: "machine",
            machine_id: machine_id,
            token: "test"
        }
        this.options.auth = auth;
        this.socket = io(serverURL,  this.options);
        
        this.machine = machine;

        console.log("Setup")
        this.socket.on("error", (error) => {
            console.error(error);
        });
        this.socket.on("connect", () => {
            console.log("Connected"); 
        });

        this.socket.on("disconnect", () => {
            console.log("Disconnected"); // undefined
        });

        this.socket.on('pingpong', (msg) => {
            console.log("receive:", msg )
            this.socket.emit("pingpong", "machine pong");
        })

        this.socket.on('period', (msg)=>{
            let period = +msg;
            if(utils.isNumber(period)){
                if(period >= 1000 && period <= 300000){
                    this.machine.setNewInterval(period)
                }else{
                    console.error("Period must be between 1000 and 300000 millis");
                }
            }else{
                console.error("The new received period is not a number");
            }
        })
    }

    public emit(topic: string, msg: string){
        this.socket.emit(topic, msg);
    }
}

interface MachineInterface{
    setNewInterval(newPeriod: number): void;
}

interface Auth{
    type: string;
    machine_id: number;
    token: string;
}