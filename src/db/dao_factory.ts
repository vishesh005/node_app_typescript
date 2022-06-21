import {User_dao, User_dao_impl} from "./user_dao";
import {RelationalDatabase} from "./database";

export class Dao_provider{

    constructor(public db: RelationalDatabase) {
    }

    get userDao() : User_dao {
        return new User_dao_impl(this.db);
    }

}
