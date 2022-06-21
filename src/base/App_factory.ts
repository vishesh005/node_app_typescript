import {Auth_app} from "./auth_app";

export class AppFactory {

   static getApplication(appType: AppType){
       switch (appType) {
         case AppType.EXPRESS_AUTH:
             return new Auth_app();
             return;
           default:
               return new Auth_app();
     }
   }

}

export enum AppType {
    EXPRESS_AUTH
}
