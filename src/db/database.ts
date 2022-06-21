import {Database, open} from "sqlite";
import * as sqlite3 from 'sqlite3';
import * as fs from 'fs';

export abstract class RelationalDatabase {

    protected constructor(protected dbUri) {
    }

    abstract init(): any;

    abstract openDb();

    abstract executeQuery(dbQuery: string): any

    abstract getAll(table: string): any;

    abstract filterBy(table: string, operators: string[], whereClause: Map<string, string>, separators: string[]): any

    abstract closeDb(): any;
}

class SqliteDatabase extends RelationalDatabase {

    private static _instance: SqliteDatabase;

    public static getInstance(dbUri: string) {
        if (SqliteDatabase._instance == undefined) {
            SqliteDatabase._instance = new SqliteDatabase(dbUri);
        }
        return SqliteDatabase._instance;
    }

    private constructor(dbUri) {
        super(dbUri);
    }

    private db: Database

    async init() {
        const isDbExists = fs.existsSync(this.dbUri);
        if (!isDbExists) {
            fs.open(this.dbUri, 'w', function (err, file) {
                if (err) throw err;
                console.log(`Database created at ${new Date()}`)
            })
            await this.setupTables();
        }
    }

   private async setupTables() {
        let db : Database
        try{
           db = await open({filename: this.dbUri, driver: sqlite3.Database});
           await this._migrateTables(db);
           await this._createTables(db);
        }catch (e) {
            console.log(e);
        }finally {
            if(db != undefined){
               await db.close();
            }
        }
    }

    private async _createTables(db: Database) {

    }

    private async _migrateTables(db: Database) {

    }




    async openDb() {
        if (this.db == undefined) {
            this.db = await open(
                {
                    filename: this.dbUri,
                    driver: sqlite3.Database
                }
            );
        }
    }

    async closeDb() {
        await this.db.close();
        this.db = undefined;
    }

    async executeQuery(dbQuery: string) {
        return await this.db.exec(dbQuery);
    }

    async filterBy(table: string, operators: string[], whereClause: Map<string, string>, separators: string[]) {
        let whereStatement: string = ""
        const clauses = Object.keys(whereClause);
        for (let i = 0; i < clauses.length; i++) {
            whereStatement += `${clauses[i]} ${operators[i]} ${whereClause[clauses[i]]} ${(i <= separators.length - 1) ? separators[i] : ''}`
        }
        return await this.db.exec(`SELECT * FROM ${table} WHERE ${whereStatement}`);
    }

    async getAll(table: string) {
        return await this.db.exec(`SELECT * FROM ${table}`)
    }

}

export class DatabaseFactory {

    static getDatabaseInstance(dbType: DatabaseType, dbUri): RelationalDatabase {
        switch (dbType) {
            case DatabaseType.SQLITE:
                return SqliteDatabase.getInstance(dbUri);
            default:
                return SqliteDatabase.getInstance(dbUri);
        }
    }
}

export enum DatabaseType {
    SQLITE
}
