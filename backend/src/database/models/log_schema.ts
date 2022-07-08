import { model, Schema, Document } from "mongoose";
const AutoIncrement = require('mongoose-sequence')(require('mongoose'));

export interface ILog extends Document{
    allarm?: string[],
    machine_id: number,
    state: string,
    modality: string,
    timestamp: Date,
    temperature: number,
    kWatt: number,
    working_time: number,
    machine_oil_level: number
}

const LogSchema = new Schema<ILog>({ 
    allarm: {type: [String], default: undefined},
    machine_id: {type: Number, require: true, readonly: true},
    state: {type: String, required: true},
    modality: {type: String, required: true},
    timestamp: {type: Date, require: true, readonly: true},
    temperature: {type: Number, require: true},
    kWatt: {type: Number, require: true},
    working_time: {type: Number, require: true},
    machine_oil_level: {type: Number}
},{ versionKey: false });

export const Log = model<ILog>("logs", LogSchema);