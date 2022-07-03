import * as express from 'express';
import {getMiddleWareFunction} from "../middleware/auth.middleware";
import {Dao_provider} from "../db/dao_provider";
import {DatabaseFactory, DatabaseType} from "../db/database";
import {Notes_validator} from "../validators/notes_validator";
import {Api_failure, Api_success} from "../models/api_models";
import {Note} from "../models/note_model";
import { v1 as uuidv1 } from 'uuid';

const notesRouter = express.Router();

const  noteDao = new Dao_provider(DatabaseFactory
    .getDatabaseInstance(DatabaseType.SQLITE))
    .noteDao;

const noteValidator = new Notes_validator();

notesRouter.use(getMiddleWareFunction)
notesRouter.post("/createNote",[],async function (req,res) {
    try {
        const message = noteValidator.validateCreateNoteRequest(req.body);
        if (message != undefined) {
            res.status(400).send(new Api_failure("Invalid Request", message, "Provided requests is not valid"));
            return;
        }
        const date = new Date();
        const newNote = new Note(uuidv1(),
            req.headers["email"],
            req.body.title,
            req.body.content,
            date.toUTCString(),
            date.toUTCString());
        const rowAffected = await noteDao.createNewNote(newNote);
        res.send(new Api_success("Notes has been Successfully created", {note: newNote}))
    }catch (e) {
        res.status(500).send(new Api_failure("Something went wrong", {}, "Some error has occurred"));
        return;
    }
})


notesRouter.get("/all",[],async function (req,res) {
    try {
        const message = noteValidator.validateAllNotes(req.body);
        if (message != undefined) {
            res.status(400).send(new Api_failure("Invalid Request", message, "Provided requests is not valid"))
            return;
        }
        const skipRecords = req.body.skipRecords == undefined ? [] : req.body.skipRecords;
        const recordsCount = req.body.recordsCount;
        const userEmail = req.headers["email"]
        const records = await noteDao.findNotesByEmail2(userEmail, skipRecords, recordsCount);
        res.send(new Api_success("Records fetched successfully", {
            records: records,
            recordCount: records.length
        }));
    }catch (e) {
        res.status(500).send(new Api_failure("Something went wrong", {}, "Some error has occurred"));
        return;
    }
})

notesRouter.get("/getById/:note_id", async function (req, res, next) {
    try {
        const noteId = req.params["note_id"];
        const email = req.headers["email"];
        const noteIdMessage = noteValidator.validateNoteId(noteId);
        if (noteIdMessage != undefined) {
            res.status(400).send(new Api_failure("Invalid Request", noteIdMessage, "Provided requests is not valid"))
            return;
        }
        const note = await noteDao.findNoteById(noteId, email);
        if (note == undefined) {
            res.send(new Api_success("Unable to find record", {"data": "Note Id is not valid"}));
            return;
        }
        res.send(new Api_success("Note has been successfully fetched", {"note": note}))
    } catch (e) {
        res.status(500).send(new Api_failure("Something went wrong", {}, "Some error has occurred"));
        return;
    }
})

export {notesRouter};
