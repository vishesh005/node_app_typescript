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


notesRouter.post("/createNote",[getMiddleWareFunction],async function (req,res) {
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



export {notesRouter};
