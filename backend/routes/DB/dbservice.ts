import User, { IUser } from "./models/user_schema";

export interface DBService{
    getUser(user_id:number): Promise<IUser | null>;
}

export class DBService_mongo implements DBService{
    public async getUser(user_id: number): Promise<IUser | null> {
        return new Promise((resolve, reject) => {
            resolve(User.findOne({user_id: user_id}, {_id:0}))

        })
    }

}