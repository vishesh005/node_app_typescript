import * as loginRouter from './login/login_controller';
import * as registerRouter from './register/register_controller';
import {notesRouter} from "./notes/notes_controller";

import {Router} from "express";


const controllers_mapping = new Map<string, Router>([
    ['/login', loginRouter],
    ['/register', registerRouter],
    ['/notes', notesRouter]
]);



export { controllers_mapping };




