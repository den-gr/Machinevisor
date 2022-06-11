import { model, Schema, Document } from "mongoose";


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
    user_id: number;
    name: string;
    surname: string;
    birth_date: Date;
    work_sheet: WorkSheet;
    authentification: Authentification;
}

const UserSchema = new Schema<IUser>({
    user_id: {type: Number, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    birth_date: {type: Date, required: true},
    work_sheet: { type: Object, required: true},
    authentification: {type: Object, required: true}
});

const User = model<IUser>("users", UserSchema);
export default User; 