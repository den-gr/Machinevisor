import { Machine, IMachine } from "./models/machine_schema";
import User, { IUser, IAuth } from "./models/user_schema";
import { ILog, Log } from "./models/log_schema";
import { GenericService } from "./services/genericService";
import { ChartService } from "./services/chartService";
import { ChartValue } from "@common/utils";

export interface DBService{
    getUser(user_id: number): Promise<IUser | null>;
    addUser(user: IUser): Promise<number>
    getMachine(machine_id: number): Promise<IMachine | null>;
    getAuth(email: string): Promise<IAuth | null>;
    getMachineList(): Promise<IMachine[]>;
    addLog(log: ILog): Promise<any>;
    getLogs(machine_id: number, limit: number): Promise<ILog[] | null>;
    getMachineCharts(machine_id: number, values: string[]): Promise<any[]>;
    getMachinesAvgValues(): Promise<any>;
    getMachinesAllarms(): Promise<ChartValue[]>;
    getWorkingTime(): Promise<ChartValue[]>
}

export class DBService_mongo extends GenericService implements DBService{
    private chartService = new ChartService();

    public addLog(log: ILog): Promise<any> {
        return new Promise((resolve, reject) => {
            if(!this.isConnected()){
                reject(this.getErrorDBNotConnected());
            }
            Log.create(log).then((newLog: ILog) => {
                resolve({
                    allarm: newLog.allarm,
                    machine_id: newLog.machine_id,
                    state: newLog.state,
                    modality: newLog.modality,
                    timestamp: newLog.timestamp,
                    temperature: newLog.temperature,
                    kWatt: newLog.kWatt,
                    working_time: newLog.working_time,
                    machine_oil_level: newLog.machine_oil_level,

                })
            }).catch((err) => reject(this.handleError(err)))
        })
    }

    public getLogs(machine_id: number, limit: number): Promise<ILog[] | null> {
        return new Promise((resolve, reject) =>{
            if(!this.isConnected()) reject(this.getErrorDBNotConnected());

            const currentDate = new Date();
            const lte = new Date(currentDate.setDate(currentDate.getDate() + 1));

            resolve(
                Log.find({machine_id: machine_id}).limit(limit).sort({timestamp:-1}))
        })
    }
    
    private findUser(query: Object, projection: Object): Promise<IUser | null>{
        return new Promise((resolve, reject) => {
            if(!this.isConnected()) reject(this.getErrorDBNotConnected());
            resolve(User.findOne(query, projection))
        })
    }

    public getUser(user_id: number): Promise<IUser | null> {
        return this.findUser({user_id: user_id}, {_id:0, auth:0})
    }

    public addUser(user: IUser): Promise<any>{
        return new Promise((resolve, reject) =>{
            if(!this.isConnected()) reject(this.getErrorDBNotConnected());
            User.create(user).then((newUser: IUser) => {
                resolve({
                    name: newUser.name,
                    surname: newUser.surname,
                    user_id: newUser.user_id
                })
            }).catch((err) => reject(this.handleError(err)))
        })
    }

    public getMachine(machine_id: number): Promise<IMachine | null> {
        return new Promise((resolve, reject) =>{
            if(!this.isConnected()) reject(this.getErrorDBNotConnected());
            resolve(Machine.findOne({machine_id: machine_id}, {_id:0}))
        })
    }


    public getAuth(email: string): Promise<IAuth> {
        return new Promise((resolve, reject) => {
            this.findUser({email: email}, {_id:0, auth:1, user_id:1}).then((user: IUser | null) => {  
                if(user != null){
                    let auth: IAuth = {
                        password_hash: user?.auth.password_hash,
                        salt: user?.auth.salt,
                        user_id: user?.user_id
                    }
                    resolve(auth)
                }else{
                    reject("Wrong email") 
                }
            }).catch((err) => reject(this.handleError(err)))
        })
    }

    public getMachineList(): Promise<IMachine[]> {
        return new Promise((resolve, reject) => {
            if(!this.isConnected()) reject(this.getErrorDBNotConnected());
            Machine.find({},{_id: 0, machine_id: 1, machine_name: 1}).then((machines: IMachine[]) => {
                resolve(machines)
            }).catch((err) => reject(this.handleError(err)))
        })
    }

    public getMachineCharts(machine_id: number, values: string[]): Promise<any[]>{
        return this.chartService.getMachineCharts(machine_id, values);
    }

    public getMachinesAvgValues(): Promise<any>{
        return this.chartService.getMachinesAvgValues();
    }

    public getMachinesAllarms(): Promise<ChartValue[]>{
        return this.chartService.getMachinesAllarms();
    }

    public getWorkingTime(): Promise<ChartValue[]>{
        return this.chartService.getWorkingTime();
    }
}