import { Query } from "mongoose";
import { resolve } from "path";
import { Machine, IMachine } from "./models/machine_schema";
import User, { IUser, IAuth } from "./models/user_schema";
const mongoose = require("mongoose");

export interface DBService{
    getUser(user_id: number): Promise<IUser | null>;
    addUser(user: IUser): Promise<number>
    getMachine(machine_id: number): Promise<IMachine | null>;
    getAuth(username: string): Promise<IAuth | null>;
    getMachineList(): Promise<IMachine[]>; 
    
}

export class DBService_mongo implements DBService{
    private readonly CONNECTED: number = 1;
    private readonly CONNECTING: number = 2;
    
    private findUser(query: Object, projection: Object): Promise<IUser | null>{
        return new Promise((resolve, reject) => {
            if(!this.isConnected()) reject("DB is not connected");
            resolve(User.findOne(query, projection))
        })
    }

    public getUser(user_id: number): Promise<IUser | null> {
        return this.findUser({user_id: user_id}, {_id:0, auth:0})
    }

    public addUser(user: IUser): Promise<any>{
        return new Promise((resolve, reject) =>{
            if(!this.isConnected()) reject("DB is not connected");
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
            if(!this.isConnected()) reject("DB is not connected");
            resolve(Machine.findOne({machine_id: machine_id}, {_id:0}))
        })
    }


    public getAuth(username: string): Promise<IAuth> {
        return new Promise((resolve, reject) => {
            this.findUser({username: username}, {_id:0, auth:1, username: 1}).then((user: IUser | null) => {  
                user != null ? resolve(user.auth) : reject("Wrong username") 
            }).catch((err) => reject(err))
        })
    }

    public getMachineList(): Promise<IMachine[]> {
        return new Promise((resolve, reject) => {
            if(!this.isConnected()) reject("DB is not connected");
            Machine.find({},{_id: 0, machine_id: 1, machine_name: 1}).then((machines: IMachine[]) => {
                resolve(machines)
            }).catch((err) => reject(err))
        })
    }



    private handleError(error: any) : {[k: string]: any} {
        if(error.name == "ValidationError"){
            return {
                errorType: "ValidationError",
                message: error.message
            };
        }else if(error.name == "MongoServerError"){
            if(error.code === 11000){ // duplicate key error
                if(error.keyValue.username){
                    return {
                        errorType: "DuplicateUsername", 
                        message: "Username " + error.keyValue.username + " already exists"
                    }
                }else{
                    return {
                        message: "Duplicate key value",
                        keyValue: error.keyValue
                    }
                }
            }
            return error;
        }else{
            return {errorName: error.name};
        }

    }

    private isConnected(): boolean{ 
        let state = mongoose.connection.readyState
        return state === this.CONNECTED || state === this.CONNECTING;
    }


}