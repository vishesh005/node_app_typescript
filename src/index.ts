import {AppFactory, AppType} from './base/App_factory';
import {controllers_mapping} from "./controllers_mapping";
import * as bodyParser  from 'body-parser';
import {DatabaseFactory, DatabaseType} from "./db/database";
import * as dotenv from 'dotenv'
dotenv.config()

const expressApp = AppFactory.getApplication(AppType.EXPRESS_AUTH);

const database = DatabaseFactory
    .getDatabaseInstance(DatabaseType.SQLITE);
database.init();


expressApp.addMiddleware(bodyParser.json())
expressApp.addMiddleware(bodyParser.urlencoded({ extended: false }))
expressApp.registerControllersMap(controllers_mapping);
expressApp.createServer(undefined)
