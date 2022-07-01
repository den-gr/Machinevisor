import { Modality, State, Report } from "../utils/utils";
import { MachineConnection } from "./machine_connection";

export interface MachineInterface{
    setNewInterval(newPeriod: number): void;
    setNewModality(newModality: Modality): void;
    setNewState(newState: State): void;
}

export class MachineSimulation implements MachineInterface{
    private static DEFAULT_PERIOD = 10000 + Math.random() * 1000;
    private static ENVIRONMENT_TEMPERATURE = 20;
    private readonly machine_id: number;
    private readonly conn: MachineConnection;
    private readonly modalities: Modality[]
    private reportLoop;
    private temperature: number = MachineSimulation.ENVIRONMENT_TEMPERATURE;
    private kWatt: number = 5
    private turnOnTimestamp: Date;
    private lastTimestamp: Date;
    private currentModality: Modality
    private state: State = State.OFF;


    constructor(serverURL: string, machine_id: number, modalities: Modality[]){
        this.conn = new MachineConnection(serverURL, machine_id, this);
        this.machine_id = machine_id;
        this.reportLoop =  setInterval(this.sendReport, MachineSimulation.DEFAULT_PERIOD, this.conn, this);
        this.turnOnTimestamp = new Date;
        this.lastTimestamp = new Date;
        this.modalities = modalities;
        this.currentModality = Modality.NO_MODE
    }

    // make an "image" of current state of the machine
    public createReport(): Object{
        let timeDiff = this.getTimeDiff();
        
        let report: Report = {
            machine_id: this.machine_id,
            state: State[this.state],
            modality: Modality[this.currentModality],
            timestamp: this.lastTimestamp,
            temperature: this.updateTemperature(timeDiff),
            kWatt: this.updateEnergyConsumption(timeDiff)
        }

        if(this.state === State.ON){
            report.working_time = Math.ceil(((this.lastTimestamp.getTime() - this.turnOnTimestamp.getTime())/1000)/60);
        }else if(this.state === State.OFF){
            report.working_time = 0;
        }else{
            console.error("Illegal state for machine")
        }
        return report;
    }

    //send report to server
    public sendReport(conn: MachineConnection, self: MachineSimulation){
        conn.emit("clients/update", JSON.stringify(self.createReport()))
    }

    //set new update period
    public setNewInterval(newPeriod: number){
        clearInterval(this.reportLoop);
        this.reportLoop = setInterval(this.sendReport, newPeriod, this.conn, this);
    }

    //set machine to a new modality 
    public setNewModality(newModality: Modality): void {
        if(this.modalities.some(x => x == newModality)){
            if(this.currentModality !== newModality){
                this.setEnergyConsumption();
            }
            this.currentModality = newModality;
        }else{
            console.error("Not allowed modality for this machine")
        }
    }

    // Set new state of machine, can be only  ON or OFF
    public setNewState(newState: State): void{
        if(newState === State.ON || newState === State.OFF){
            if(newState === State.ON && this.state === State.OFF){
                this.start()
            }else{
                this.currentModality = Modality.NO_MODE;
            }
            this.state = newState;
        }else{
            console.error("Illegal state of machine")
        }
    }

    private setEnergyConsumption(){
        if(this.currentModality === Modality.SLEEP_MODE){
            this.kWatt = 0.1;
        }else if(this.currentModality === Modality.PRODUCTION_MODE){
            this.kWatt = 5;
        }else if(this.currentModality === Modality.ENERGY_ECONOMY_PRODUCTION_MODE){
            this.kWatt = 3;
        }else{
            console.log("illegal machine modality")
        }
    }

    private start(){
        this.currentModality = this.modalities[0]
        this.turnOnTimestamp = new Date;
        this.setEnergyConsumption();
    }

    private getTimeDiff(): number{
        let newTimestamp: Date = new Date()
        let timeDiff = newTimestamp.getTime() - this.lastTimestamp.getTime();
        this.lastTimestamp = newTimestamp;
        return timeDiff;
    }

    private updateTemperature(timeDiff: number): number{
        let sign: number = 0;
        let diffTemperature: number = this.temperature - MachineSimulation.ENVIRONMENT_TEMPERATURE;
        if(diffTemperature > 50){
            diffTemperature = 50;
        }

        let cond: boolean = Math.random() + (50 - diffTemperature)/100 > 0.5;
        if(this.currentModality === Modality.PRODUCTION_MODE && this.state === State.ON){
            sign = cond ? 1 +(50 - diffTemperature)/50 : -1.1;
        }else if(this.currentModality === Modality.ENERGY_ECONOMY_PRODUCTION_MODE && this.state === State.ON){
            sign = cond ? 0.5 + (50 - diffTemperature)/100 : -0.6;
        }else{
            sign = -0.2;
        }

        this.temperature = parseFloat((this.temperature + Math.random() * sign * (timeDiff * 0.001)).toFixed(1))
        if(this.temperature < MachineSimulation.ENVIRONMENT_TEMPERATURE){
            this.temperature = MachineSimulation.ENVIRONMENT_TEMPERATURE;
        }
        return this.temperature;
    }

    private updateEnergyConsumption(timeDiff: number): number{
        let sign: number = Math.random() > 0.5 ? 1 : -1;
        this.kWatt = parseFloat((this.kWatt + Math.random() * sign * (timeDiff * 0.00001)).toFixed(2))
        if(this.currentModality === Modality.PRODUCTION_MODE && this.state === State.ON){
            if(this.kWatt > 6){
                this.kWatt = 6
            }else if(this.kWatt < 4){
                this.kWatt = 4
            }
        }else if(this.currentModality === Modality.ENERGY_ECONOMY_PRODUCTION_MODE && this.state === State.ON){
            if(this.kWatt > 4){
                this.kWatt = 4
            }else if(this.kWatt < 2){
                this.kWatt = 2
            }
        }else if(this.currentModality === Modality.SLEEP_MODE && this.state === State.ON){
            if(this.kWatt > 0.3){
                this.kWatt = 0.3
            }else if(this.kWatt < 0){
                this.kWatt = 0
            }
        }else{
            this.kWatt = 0;
        }
        return this.kWatt;
    }
}