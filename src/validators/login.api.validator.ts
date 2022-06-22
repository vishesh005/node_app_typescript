import * as basicValidator from  './basic_validator';
import {validatePhoneNo} from "./basic_validator";


export class LoginApiValidator {

    static validateLoginGetRequest(request: any): any {
        const validateEmail = basicValidator.validateEmail(request.email,true);
        const validatePassword = basicValidator.validatePassword(request.password,true);
        if(validateEmail != undefined){
             return validateEmail;
        }
        else if(validatePassword != undefined){
            return validatePassword;
        }
        else {
            return undefined;
        }
    }
}


