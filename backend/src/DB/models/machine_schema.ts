import { model, Schema, Document } from "mongoose";
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

export interface IMachine extends Document{
    machine_id: number;
    machine_name: string;
    weight: number;
    brand: string;
    production_year: Date;
    last_revision: Date;
    client_service_number: string;
    modalities: Modality[];
}

// export interface Modality{
//     value: string;
//     // name: string; 
// }

enum Modality{
    SLEEP_MODE,
    COOL_DOWN_MODE,
    ENERGY_ECONOMY_PRODUCTION_MODE,
    PRODUCTION_MODE,
    DEBUG_MODE
}



// const ModalitySchema = new Schema<Modality>({
//     value: {type: String, enum: ["SLEEP_MODE", "COOL_DOWN_MODE", "ENERGY_ECONOMY_PRODUCTION_MODE", "PRODUCTION_MODE"], default: "SLEEP_MODE", required: true}
//     // name: {type: String, required: true}
// }, {_id: false})

const MachineSchema = new Schema<IMachine>({ 
    machine_id: {type: Number, require: true, readonly: true},
    machine_name: {type: String, required: true},
    weight: {type: Number, require: true},
    brand: {type: String, require: true},
    production_year: {type: Date, require: true},
    last_revision: {type: Date, require: true},
    client_service_number: {type: String, require: true},
    modalities: {type: [String], enum: Modality, required: true}
});

MachineSchema.plugin(AutoIncrement, {inc_field: "machine_id"})

export const Machine = model<IMachine>("machines", MachineSchema);