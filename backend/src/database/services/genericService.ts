
import mongoose = require("mongoose");

export class GenericService{
    private readonly CONNECTED: number = 1;
    private readonly CONNECTING: number = 2;


    protected handleError(error: any) : {[k: string]: any} {
        if(error.name == "ValidationError"){
            return {
                errorType: "ValidationError",
                message: error.message
            };
        }else if(error.name == "MongoServerError"){
            if(error.code === 11000){ // duplicate key error
                if(error.keyValue.email){
                    return {
                        errorType: "DuplicateUsername", 
                        message: "Email " + error.keyValue.email + " already registered"
                    }
                }else{
                    return {
                        errorType: "Duplicate key value",
                        message: `Duplicated key: ${error.keyValue}` 
                    }
                }
            }
        }
        return {errorType: error.name, message: error.message};
    }

    protected getErrorDBNotConnected(){
        return {errorType: "ConnectionServerError", message: "DB is not connected"}
    }

    protected isConnected(): boolean{ 
        let state = mongoose.connection.readyState
        return state === this.CONNECTED || state === this.CONNECTING;
    }
}