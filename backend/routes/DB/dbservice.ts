import Machine, { IMachine } from "./models/machine_schema";
import User, { IUser } from "./models/user_schema";

export interface DBService{
    getUser(user_id:number): Promise<IUser | null>;
    addUser(user: IUser): Promise<number>
    getMachine(machine_id:number): Promise<IMachine | null>;
    
}

export class DBService_mongo implements DBService{
    public getUser(user_id: number): Promise<IUser | null> {
        return new Promise((resolve, reject) => {
            resolve(User.findOne({user_id: user_id}, {_id:0, authentification: 0}))

        })
    }

    public addUser(user: IUser): Promise<any>{
        return new Promise((resolve, reject) =>{
            try{
                let newUser= User.create(user)
                resolve(newUser)

            }catch(error: any){
                reject(this.handleError(error))
            }
        })
    }

    public getMachine(machine_id: number): Promise<IMachine | null> {
        return new Promise((resolve, reject) =>{
            resolve(Machine.findOne({machine_id: machine_id}, {_id:0}))
        })
    }


    private handleError(error: any) : {[k: string]: any} {
        if(error.name == "ValidationError"){
            let errors: {[k: string]: any}  = {};
    
            Object.keys(error.errors).forEach((key) => {
                errors.key = error.errors[key].message;
            });
            return errors;
        }else{
            return {errorName: error.name};
        }

    }


}