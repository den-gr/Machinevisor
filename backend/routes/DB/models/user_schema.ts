import { model, Schema, Document } from "mongoose";
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


interface WorkSheet{
    monday: Array<String>;
    tuesday: Array<String>;
    wednesday: Array<String>;
    thursday: Array<String>;
    friday: Array<String>;
}

interface Authentification{
    password_hash: String;
    salt: String;
}

export interface IUser extends Document{
    // user_id: number;
    name: string;
    surname: string;
    birth_date: Date;
    work_sheet?: WorkSheet;
    authentification: Authentification;
}

const WorkSheetSchema = new Schema<WorkSheet>({
    monday: [String],
    tuesday:  [String],
    wednesday:   [String],
    thursday:   [String],
    friday:  [String]
});

const UserSchema = new Schema<IUser>({
    // user_id: {type: Number, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    birth_date: {type: Date, required: true},
    work_sheet: { type: WorkSheetSchema, required: false},
    authentification: {type: Object, required: true},
},{ versionKey: false });

UserSchema.plugin(AutoIncrement, {inc_field: "user_id"});

const User = model<IUser>("users", UserSchema);
export default User; 