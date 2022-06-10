import { model, Schema, Document } from "mongoose";

export interface IUser extends Document{
    user_id: number;
    name: string;
    surname: string
}

const UserSchema = new Schema<IUser>({
    user_id: {
        type: Number,
        required: true,
    },
    
    name: {
        type: String,
        required: true
    },
    
    surname: {
        type: String,
        required: true
    }
});

const User = model<IUser>("users", UserSchema);
export default User; 