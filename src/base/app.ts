import {Router} from "express";

export interface App {

    createServer(port: number);
    stopServer();
    registerControllersMap(controller_mapping: Map<string,Router>)
}
