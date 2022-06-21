import {Register_user, User} from "../models/user_models";
import {RelationalDatabase} from "./database";
import {UserTable} from "./tables";


export interface User_dao {

    getAllUser() : Promise<User[]>

    findUserByEmail(email: string): Promise<User>

    registerNewUser(registeredUser: Register_user): Promise<any>

    findUserWithPassword(email: string): Promise<Register_user>

}


export class User_dao_impl implements  User_dao {

    constructor(private readonly db: RelationalDatabase) {}


    async findUserByEmail(email: string): Promise<User> {
        const response = await this.db
            .executeQuery(`SELECT * from ${UserTable.tableName} where ${UserTable.column_email}=${email}`);
        return User.fromResponse(response);
    }

    async findUserWithPassword(email: string): Promise<Register_user> {
        const response = await this.db
            .executeQuery(`SELECT * from ${UserTable.tableName} where ${UserTable.column_email}=${email}`);
        return Register_user.fromResponse(response);
    }

    async getAllUser(): Promise<User[]> {
        const users :User[] = [];
        const response = await this.db
            .executeQuery(`SELECT * from ${UserTable.tableName}`);
        for(let i = 0;i <response.length; i++){
            const user = User.fromResponse(response);
            users.push(user);
        }
        return users;
    }

   async registerNewUser(registeredUser: Register_user) : Promise<any> {
     return await this.db.executeQuery(`INSERT INTO ${UserTable.tableName} `+
       `(${UserTable.column_email}, ${UserTable.name}, ${UserTable.column_age}, ${UserTable.column_phone_no}, ${UserTable.column_password}) VALUES `+
       `(${registeredUser.email}, ${registeredUser.name}, ${registeredUser.age}, ${registeredUser.phone_no}, ${registeredUser.password})`)
   }

}
