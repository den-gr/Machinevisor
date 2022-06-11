import { model, Schema, Document } from "mongoose";

export interface IMachine extends Document{
    machine_id: number;
    weight: number;
    brand: string;
    production_year: Date;
    last_revision: Date;
    client_service_number: String;

}

const MachineSchema = new Schema<IMachine>({
    machine_id: {type: Number, require: true},
    weight: {type: Number, require: true},
    brand: {type: String, require: true},
    production_year: {type: Date, require: true},
    last_revision: {type: Date, require: true},
    client_service_number: {type: String, require: true}
  
});

const Machine = model<IMachine>("machines", MachineSchema);
export default Machine; 