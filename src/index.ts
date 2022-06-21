import {AppFactory, AppType} from './base/App_factory';
import {controllers_mapping} from "./controllers_mapping";

const expressApp = AppFactory.getApplication(AppType.EXPRESS_AUTH);

expressApp.registerControllersMap(controllers_mapping);
expressApp.createServer(8090)
