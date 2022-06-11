import Machine, { IMachine } from "./models/machine_schema";
import User, { IUser } from "./models/user_schema";

export interface DBService{
    getUser(user_id:number): Promise<IUser | null>;
    getMachine(machine_id:number): Promise<IMachine | null>;
}

export class DBService_mongo implements DBService{
    public getUser(user_id: number): Promise<IUser | null> {
        return new Promise((resolve, reject) => {
            resolve(User.findOne({user_id: user_id}, {_id:0, authentification: 0}))

        })
    }

    public getMachine(machine_id: number): Promise<IMachine | null> {
        return new Promise((resolve, reject) =>{
            resolve(Machine.findOne({machine_id: machine_id}, {_id:0}))
        })
    }

}