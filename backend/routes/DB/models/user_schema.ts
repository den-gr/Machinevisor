import { model, Schema, Document } from "mongoose";
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

interface DaySchedule{
    first_shift?: String;
    second_shift?: String;
}

interface WorkSheet{
    monday: DaySchedule;
    tuesday: DaySchedule;
    wednesday: DaySchedule;
    thursday: DaySchedule;
    friday: DaySchedule;
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

const DayScheduleSchema = new Schema<DaySchedule>({
    first_shift: String,
    second_shift: String
}, {_id: false})

const WorkSheetSchema = new Schema<WorkSheet>({
    monday: DayScheduleSchema,
    tuesday:  DayScheduleSchema,
    wednesday:   DayScheduleSchema,
    thursday:   DayScheduleSchema,
    friday:  DayScheduleSchema
}, {_id: false});


let schedule1: DaySchedule = {first_shift: "8AM-12AM", second_shift: "1PM-5PM"};
let schedule2: DaySchedule = {first_shift: "5PM-9PM", second_shift: "10PM-1AM"};
let DefaultWorkSheet: WorkSheet = {
    monday: schedule1,
    tuesday: schedule1,
    wednesday: schedule2,
    thursday: schedule2,
    friday: schedule2
}

const UserSchema = new Schema<IUser>({
    // user_id: {type: Number, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    birth_date: {type: Date, required: true},
    work_sheet: { type: WorkSheetSchema, required: false, default: DefaultWorkSheet},
    authentification: {type: Object, required: true},
},{ versionKey: false });

UserSchema.plugin(AutoIncrement, {inc_field: "user_id"});

const User = model<IUser>("users", UserSchema);
export default User; 



