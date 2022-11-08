import {User_dao, User_dao_impl_sqlite} from "./user_dao";
import {AppDatabase, DatabaseFactory, DatabaseType, RelationalDatabase} from "./database";
import {Note_dao, Note_dao_impl_sqlite} from "./note_dao";

export class Dao_provider{

    private static instance : Dao_provider


    public static getInstance(): Dao_provider {
        if (!Dao_provider.instance) {
            Dao_provider.instance = new Dao_provider();
        }

        return Dao_provider.instance;
    }

  private readonly database : AppDatabase


   private constructor() {
      this.database = DatabaseFactory.getDatabaseInstance();
   }

    get userDao() : User_dao {
        switch (this.database.dbType){
            case DatabaseType.SQLITE:
                return new User_dao_impl_sqlite(this.database as RelationalDatabase);
            default:
                return new User_dao_impl_sqlite(this.database as RelationalDatabase);
        }
    }

    get noteDao(): Note_dao {
        switch (this.database.dbType){
            case DatabaseType.SQLITE:
                return new Note_dao_impl_sqlite(this.database as RelationalDatabase);
            default:
                return new Note_dao_impl_sqlite(this.database as RelationalDatabase);
        }
    }

}
