import {App} from './app';
import  * as express_app from 'express';
import {Router} from "express";
import {controllers_mapping} from "../controllers_mapping";

export class Auth_app implements App{

     private expressApp

    constructor() {
       this.expressApp = express_app()
    }

    createServer(port: number) {
       this.expressApp.listen(port || process.env.PORT, function (){
           console.log(`Express Auth App is up and running on port ${port}`)
       })
    }

    registerControllersMap(controller_mapping: Map<string, Router>) {
        const mappingRoutes = Array.from(controllers_mapping.keys());
        for (let i:number = 0 ; i < mappingRoutes.length  ; i++){
            const routePath = mappingRoutes[i];
             this.expressApp.use(routePath, controller_mapping.get(routePath));
        }
    }

    addMiddleware(middleware: any){
       this.expressApp.use(middleware);
    }

    stopServer() {
         this.expressApp.close()
    }


}
