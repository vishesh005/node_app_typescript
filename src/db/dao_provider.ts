import {User_dao, User_dao_impl} from "./user_dao";
import {RelationalDatabase} from "./database";
import {Note_dao, Note_dao_impl} from "./note_dao";

export class Dao_provider{

    constructor(public db: RelationalDatabase) {
    }

    get userDao() : User_dao {
        return new User_dao_impl(this.db);
    }

    get noteDao(): Note_dao {
        return new Note_dao_impl(this.db)
    }

}
