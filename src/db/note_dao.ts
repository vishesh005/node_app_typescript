import {Note} from "../models/note_model";
import {RelationalDatabase} from "./database";
import {NotesTable} from "./tables";


export interface Note_dao {

    getAllNotes(): Promise<Note[]>

    findNoteById(id: string): Promise<Note>

    createNewNote(note: Note): Promise<any>

    findNotesByEmail(email: string): Promise<Note[]>

    findNotesByCreatedDate(createdDate: Date): Promise<Note[]>

    findNotesByModifiedDate(modifiedDate: Date): Promise<Note[]>

    findNotesBetweenTwoCreatedDates(from_created_date: Date, to_created_date: Date): Promise<Note[]>

    findNotesBetweenTwoModifiedDates(from_modified_date: Date, to_modified_date: Date): Promise<Note[]>

    deleteNoteById(id: string)

}

export class Note_dao_impl implements Note_dao {

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

    deleteNoteById(id: string) {

    }

    findNoteById(id: string): Promise<Note> {
        return Promise.resolve(undefined);
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


}
