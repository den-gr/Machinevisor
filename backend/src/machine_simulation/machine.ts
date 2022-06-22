import { io, Socket, connect, SocketOptions, ManagerOptions } from "socket.io-client";
import { Modality, isNumber, State } from "../utils/utils";


export class MachineSimulation implements MachineInterface{
    private static DEFAULT_PERIOD = 10000 + Math.random() * 1000;
    private readonly machine_id: number;
    private readonly conn: MachineConnection;
    private reportLoop;
    private temperature: number = 20;
    private kWh: number = 5
    private lastTimestamp: Date;
    private readonly turnOnTimestamp: Date;
    private readonly modalities: Modality[]
    private currentModality: Modality
    private state: State = State.OFF;


    constructor(serverURL: string, machine_id: number, modalities: Modality[]){
        this.conn = new MachineConnection(serverURL, machine_id, this);
        this.machine_id = machine_id;
        this.reportLoop =  setInterval(this.sendReport, MachineSimulation.DEFAULT_PERIOD, this.conn, this);
        this.turnOnTimestamp = new Date;
        this.lastTimestamp = new Date;
        this.modalities = modalities;
        this.currentModality = this.modalities[0]
    }

    public createReport(): Object{
        let timeDiff = this.getTimeDiff();
        this.updateTemperature(timeDiff);
        this.updateEnergyConsumption(timeDiff);
        //TODO refactoring
        
        let report: Report = {
            machine_id: this.machine_id,
            state: State[this.state],
            modality: Modality[this.currentModality],
            timestamp: this.lastTimestamp,
            temperature: this.temperature
        }

        if(this.state === State.ON){
            report.working_time = (this.lastTimestamp.getMinutes() - this.turnOnTimestamp.getMinutes());
            report.kWh = this.kWh;
        }else if(this.state === State.OFF){
            report.working_time = 0;
            report.kWh = 0;
        }else{
            console.error("Illegal state for mahine side")
        }
        return report;
    }

    public sendReport(conn: MachineConnection, self: MachineSimulation){
        conn.emit("clients/update", JSON.stringify(self.createReport()))
    }

    public setNewInterval(newPeriod: number){
        clearInterval(this.reportLoop);
        this.reportLoop = setInterval(this.sendReport, newPeriod, this.conn, this);
    }

    public setNewModality(newModality: Modality): void {
        if(this.modalities.some(x => x == newModality)){
            this.currentModality = newModality;
        }else{
            console.error("Not allowed modality for this machine")
        }
    }

    public setNewState(newState: State): void{
        if(newState === State.ON || newState === State.OFF){
            this.state = newState;
        }else{
            console.error("Illegal state of machine")
        }
    }

    private getTimeDiff(): number{
        let newTimestamp: Date = new Date()
        let timeDiff = newTimestamp.getTime() - this.lastTimestamp.getTime();
        this.lastTimestamp = newTimestamp;
        return timeDiff;
    }

    private updateTemperature(timeDiff: number){
        let sign: number = Math.random() > 0.5 ? 1 : -1;
        this.temperature = parseFloat((this.temperature + Math.random() * sign * (timeDiff * 0.00001)).toFixed(1))
    }

    private updateEnergyConsumption(timeDiff: number): number{
        let sign: number = Math.random() > 0.5 ? 1 : -1;
        this.kWh = parseFloat((this.kWh + Math.random() * sign * (timeDiff * 0.00001)).toFixed(2))
        if(this.kWh > 6){
            this.kWh = 6
        }else if(this.kWh < 4){
            this.kWh = 4
        }
        return this.kWh;
    }
}


class MachineConnection{
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
            console.log("Disconnected"); // undefined
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

interface MachineInterface{
    setNewInterval(newPeriod: number): void;
    setNewModality(newModality: Modality): void;
    setNewState(newState: State): void;
}

interface Auth{
    type: string;
    machine_id: number;
    token: string;
}

interface Report{
    machine_id: number;
    state: string;
    modality: string;
    timestamp?: Date;
    working_time?: number;
    temperature?: number;
    kWh?: number;
}