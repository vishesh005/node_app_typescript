import * as basicValidator from  './basic_validator';


export class RegisterApiValidator {

    static validateRegisterGetRequest(request: any): any {

        const validateEmail = basicValidator.validateEmail(request.email,true);
        const validatePassword = basicValidator.validatePassword(request.password,true);
        const validatePhoneNo = basicValidator.validatePhoneNo(request.phone_no,true);

        if((typeof request.name != "string") || request.name == undefined || request.name.length < 3){
            return [{message: "Please provide a valid name."}];
        }
        else if(validateEmail != undefined){
            return validateEmail;
        }
        else if((typeof request.age != "number") || request.age == undefined || request.age < 10){
            return [{message: "Please provide valid age between 10 -100 years"}];
        }
        else if(validatePhoneNo != undefined){
            return validatePhoneNo;
        }
        else if(validatePassword != undefined){
            return validatePassword;
        }
        else {
            return undefined;
        }
    }
}
