import * as loginRouter from './login/login_controller';
import * as registerRouter from './register/register_controller';

import {Router} from "express";


const controllers_mapping = new Map<string, Router>([
    ['/login', loginRouter],
    ['/register', registerRouter]
]);



export { controllers_mapping };




