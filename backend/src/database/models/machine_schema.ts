import { model, Schema, Document } from "mongoose";
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
import { Modality } from "../../utils/utils";

export interface IMachine extends Document{
    machine_id: number;
    machine_name: string;
    weight: number;
    brand: string;
    production_year: Date;
    last_revision: Date;
    client_service_number: string;
    img_uri: string;
    modalities: Modality[];
    values: string[];
}

const MachineSchema = new Schema<IMachine>({ 
    machine_id: {type: Number, require: true, readonly: true},
    machine_name: {type: String, required: true},
    weight: {type: Number, require: true},
    brand: {type: String, require: true},
    production_year: {type: Date, require: true},
    last_revision: {type: Date, require: true},
    client_service_number: {type: String, require: true},
    img_uri: {type: String, default: "/images/machines/default.jpg"},
    modalities: {type: [String], enum: Modality, required: true},
    values: {type: [String], required: true}

});

MachineSchema.plugin(AutoIncrement, {inc_field: "machine_id"})

export const Machine = model<IMachine>("machines", MachineSchema);