import * as loginRouter from './login/login_controller';
import {Router} from "express";


const controllers_mapping = new Map<string, Router>([
    ['/login', loginRouter]
]);



export { controllers_mapping };




