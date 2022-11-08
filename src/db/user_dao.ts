import {Register_user, User, UserWithAuth} from "../models/user_models";
import {RelationalDatabase} from "./database";
import {UserAuthTable, UserTable} from "./tables";


export interface User_dao {

    getAllUser() : Promise<User[]>

    findUserByEmail(email: string): Promise<User>

    registerNewUser(registeredUser: Register_user): Promise<any>

    findUserWithPassword(email: string): Promise<Register_user>

    createUserSession(userWithAuth: UserWithAuth) : Promise<any>

    findUserAuthenticationSession(email:string) : Promise<UserWithAuth>
}


export class User_dao_impl_sqlite implements  User_dao {

    constructor(private readonly db: RelationalDatabase) {}




    async findUserByEmail(email: string): Promise<User> {
        await this.db.openDb();
        const response = await this.db.getRecord(UserTable.tableName,UserTable.column_email,email);
        const user = User.fromResponse(response);
        await this.db.closeDb();
        return user;
    }

    async findUserWithPassword(email: string): Promise<Register_user> {
        await this.db.openDb();
        const response = await this.db.getRecord(UserTable.tableName,UserTable.column_email,email);
        const registerUser = Register_user.fromResponse(response);
        await this.db.closeDb();
        return registerUser;
    }

    async getAllUser(): Promise<User[]> {
        await this.db.openDb();
        const users :User[] = [];
        const response = await this.db
            .executeQuery(`SELECT * from ${UserTable.tableName}`);
        for(let i = 0;i <response.length; i++){
            const user = User.fromResponse(response);
            users.push(user);
        }
        await this.db.closeDb();
        return users;
    }

   async registerNewUser(registeredUser: Register_user) : Promise<any> {
       await this.db.openDb();
       const rowAffected = await this.db.executeQuery(`INSERT INTO ${UserTable.tableName} `+
       `(${UserTable.column_email}, ${UserTable.column_name}, ${UserTable.column_age}, ${UserTable.column_phone_no}, ${UserTable.column_password}) VALUES `+
       `("${registeredUser.email}", "${registeredUser.name}", ${registeredUser.age}, ${registeredUser.phone_no}, "${registeredUser.password}")`)
       await this.db.closeDb();
       return  rowAffected;
    }

    async createUserSession(userWithAuth: UserWithAuth) : Promise<any> {
        await this.db.openDb();
        const rowAffected = await this.db.executeQuery(`INSERT OR REPLACE INTO ${UserAuthTable.tableName} `+
            `(${UserAuthTable.column_email}, ${UserAuthTable.column_name}, ${UserAuthTable.column_token}) VALUES `+
            `("${userWithAuth.email}", "${userWithAuth.name}", "${userWithAuth.authToken}")`)
        await this.db.closeDb();
        return  rowAffected;
    }

    async findUserAuthenticationSession(email: string): Promise<UserWithAuth> {
        await this.db.openDb();
        const response = await this.db.getRecord(UserAuthTable.tableName,UserTable.column_email,email);
        const userWithAuth = UserWithAuth.fromResponse(response);
        await this.db.closeDb();
        return userWithAuth;
    }
}
