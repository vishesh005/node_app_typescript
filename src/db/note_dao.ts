import {Note} from "../models/note_model";
import {RelationalDatabase} from "./database";
import {NotesTable} from "./tables";
import List = Mocha.reporters.List;


export interface Note_dao {

    getAllNotes(): Promise<Note[]>

    findNoteById(id: string, email:string): Promise<Note>

    createNewNote(note: Note): Promise<any>

    findNotesByEmail2(email: string, skipIds: Array<string>, limit: number): Promise<Note[]>

    findNotesByEmail(email: string): Promise<Note[]>

    findNotesByCreatedDate(createdDate: Date): Promise<Note[]>

    findNotesByModifiedDate(modifiedDate: Date): Promise<Note[]>

    findNotesBetweenTwoCreatedDates(from_created_date: Date, to_created_date: Date): Promise<Note[]>

    findNotesBetweenTwoModifiedDates(from_modified_date: Date, to_modified_date: Date): Promise<Note[]>

    deleteNoteById(id: string, email:string)

    deleteNoteByIds(ids: Array<string>, email:string): Promise<any>

    getCountByEmail(email:string,skipRecords : Array<string>): Promise<number>

    updateNote(note: Note) : Promise<any>;

    updateNotes(notes: Array<Note>, email:string) : Promise<any>;
}

export class Note_dao_impl_sqlite implements Note_dao {

    constructor(private readonly db: RelationalDatabase) {
    }




    async createNewNote(note: Note): Promise<any> {
       await this.db.openDb();
        const response = await this.db.executeQuery(`INSERT INTO ${NotesTable.tableName} (` +
            `${NotesTable.column_id}, ${NotesTable.column_createdBy}, ${NotesTable.column_title},` +
            `${NotesTable.column_content}, ${NotesTable.column_created_datestamp}, ${NotesTable.column_modified_datestamp}) ` +
            `VALUES ("${note.note_id}", "${note.createdBy}", "${note.title}", ` +
            `"${note.content}", "${note.created_at}", "${note.modified_at}")`);
        await this.db.closeDb();
        return Note.fromResponse(response);
    }

    async deleteNoteById(id: string, email:string) {
        await this.db.openDb();
        const resultSet = await this.db.executeQuery(`DELETE FROM ${NotesTable.tableName} WHERE ${NotesTable.column_id} = "${id}" AND ${NotesTable.column_createdBy} = "${email}"`);
        await this.db.closeDb();
        return resultSet.changes;
    }

    async findNoteById(id: string,email:string): Promise<Note> {
        await this.db.openDb();
        let map = new Map<string,string>();
        map.set(NotesTable.column_id, `"${id}"`);
        map.set(NotesTable.column_createdBy,`"${email}"`);
        const response = await this.db.filterBy(NotesTable.tableName,["=","="],map, ["AND"], {limit: 1});
        await this.db.closeDb();
        return Note.fromResponse(response[0]);
    }

    findNotesBetweenTwoCreatedDates(from_created_date: Date, to_created_date: Date): Promise<Note[]> {
        return Promise.resolve([]);
    }

    findNotesBetweenTwoModifiedDates(from_modified_date: Date, to_modified_date: Date): Promise<Note[]> {
        return Promise.resolve([]);
    }

    findNotesByCreatedDate(createdDate: Date): Promise<Note[]> {
        return Promise.resolve([]);
    }

    findNotesByEmail(email: string): Promise<Note[]> {
        return Promise.resolve([]);
    }

    findNotesByModifiedDate(modifiedDate: Date): Promise<Note[]> {
        return Promise.resolve([]);
    }

    getAllNotes(): Promise<Note[]> {
        return Promise.resolve([]);
    }

    async findNotesByEmail2(email: string, skipIds: Array<string>, limit: number): Promise<Note[]> {
        await this.db.openDb();
        const idMap =new Map<string,string>();
        idMap.set(NotesTable.column_createdBy,`"${email}"`);
        idMap.set(NotesTable.column_id,`("${skipIds.join('","')}")`)
        const records = await this.db.filterBy(NotesTable.tableName, ["=","not in"], idMap, ["AND"],{limit: limit});
        await this.db.closeDb();
        return records.map((record)=> Note.fromResponse(record));
    }

    async getCountByEmail(email: string, skipRecords: Array<string>): Promise<number> {
        await this.db.openDb();
        const idMap =new Map<string,string>();
        idMap.set(NotesTable.column_id,`("${skipRecords.join('","')}")`)
        const count = await this.db.getCount(NotesTable.tableName,["=","not in"], idMap, ["AND"],"*");
        await this.db.closeDb();
        return count;
    }

   async deleteNoteByIds(ids: Array<string>, email: string) {
        await this.db.openDb();
        const idsString = `"${ids.join('","')}"`
        const records = await this.db.executeQuery(`DELETE FROM ${NotesTable.tableName} WHERE ${NotesTable.column_id} in (${idsString}) AND ${NotesTable.column_createdBy} = "${email}"`);
        await this.db.closeDb();
        return records.changes;
    }

   async updateNote(note: Note) : Promise<any> {
        await this.db.openDb();
        let setQuery = "";
        const data = {};
        if(note.title != undefined){
           data[NotesTable.column_title] = note.title
        }
        if(note.content != undefined){
            data[NotesTable.column_content] = note.content
        }
        const keys = Object.keys(data);
        for (let i = 0; i< keys.length ;i++){
            setQuery+= `${keys[i]} = "${data[keys[i]]}", `;
        }
        const response = await this.db.executeQuery(`UPDATE ${NotesTable.tableName} SET ` +
            `${setQuery}`+
            `${NotesTable.column_modified_datestamp} = "${note.modified_at}" `+
            `WHERE ${NotesTable.column_id} = "${note.note_id}" AND `+
            `${NotesTable.column_createdBy} = "${note.createdBy}"`);
        await this.db.closeDb();
        return response.changes;
    }

    async updateNotes(notes: Note[]): Promise<any> {
        await this.db.openDb();
        let titleCount = 0;
        let contentCount = 0;
        let titleSet = `${NotesTable.column_title} = CASE ${NotesTable.column_id} `;
        let contentSet = `${NotesTable.column_content} = CASE ${NotesTable.column_id} `;

        for (let i = 0; i < notes.length; i++) {
            if (notes[i].title != undefined) {
                titleSet += `WHEN "${notes[i].note_id}" THEN "${notes[i].title}" `;
                ++titleCount;
            }
            if (notes[i].content != undefined) {
                contentSet += `WHEN "${notes[i].note_id}" THEN "${notes[i].content}" `;
                ++contentCount;
            }
        }
        if (titleCount > 0) {
            titleSet += "END ";
        } else {
            titleSet = "";
        }
        if (contentCount > 0) {
            contentSet += "END";
        } else {
            contentSet = "";
        }

        const whereIds = notes.map((note)=>  note.note_id).join(`","`);
        const updateQuery = `UPDATE ${NotesTable.tableName} SET ${titleSet} ${titleSet === "" || contentSet === "" ? '' : ', '} ${contentSet} ` +
            `WHERE ${NotesTable.column_id} IN ("${whereIds}")`;
        const response = await this.db.executeQuery(updateQuery);
        await this.db.closeDb();
        return response.changes;
    }



}

