import * as emailValidator from 'email-validator';
import * as PasswordValidator from "password-validator";
const passwordSchema = new PasswordValidator();
passwordSchema
    .is().min(8)
    .is().max(20)
    .has().uppercase()
    .has().lowercase()
    .has().digits(2);

const REQ_PARAM = "Required parameter";
const TYPE_CHECK = "Parameter type check";
const PARAM_VAL = "Params validation";


export const validateEmail = function (email, required: boolean): any {
     if(email == undefined && required){
         return [{validation: REQ_PARAM, message: "Please mandatory email parameter"}]
     }
     else if(typeof email != 'string'){
         return [{validation: TYPE_CHECK, message: "Email param should be string"}]
     }
     else if(!emailValidator.validate(email)) {
        return  [{validation: PARAM_VAL, message: "Please provide valid email address"}]
     }
}


export const validatePassword= function (password ,required: boolean): any {
    if(password == undefined && required){
        return [{validation: REQ_PARAM, message: "Please provide mandatory password parameter"}]
    }
    else if(typeof password != 'string'){
        return [{validation: TYPE_CHECK, message: "Password param should be string"}]
    }
    else if(!passwordSchema.validate(password)) {
        return passwordSchema.validate(password,{details: true});
    }
}

export const validatePhoneNo = function (phone_no ,required: boolean) {
    const numberPhone = `${phone_no}`
        .replace("+91","")
        .replace("-","")
        .replace(" ","")
    if(phone_no == undefined && required){
        return [{validation: REQ_PARAM, message: "Please provide mandatory phone no parameter"}]
    }
    else if(typeof phone_no != 'number'){
        return [{validation: TYPE_CHECK, message: "Phone no param should be number"}]
    }
    else if(!RegExp("^[6-9]\\d{9}$").test(numberPhone)) {
        return [{validation: PARAM_VAL, message: "Please provide valid phone number"}];
    }
}


export const validateAuthToken = (token: string) : any => {
    if(token == undefined ||
      !token.includes("Bearer") ||
      token.replace("Bearer","").length < 32){
        return [{validation: "Invalid Request", message: "Invalid requested user access token"}]
    }
    else{
        return undefined;
    }
}



