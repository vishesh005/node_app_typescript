import * as express from 'express';
import {getMiddleWareFunction} from "../middleware/auth.middleware";
import {Dao_provider} from "../db/dao_factory";
import {DatabaseFactory, DatabaseType} from "../db/database";

const notesRouter = express.Router();

const  userDao = new Dao_provider(DatabaseFactory
    .getDatabaseInstance(DatabaseType.SQLITE))
    .userDao;


notesRouter.post("/createNote",[getMiddleWareFunction],function (req,res) {
    res.send("Notes has successfully created");
})



export {notesRouter};
