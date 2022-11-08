import * as express from 'express';
import {LoginApiValidator} from "../validators/login.api.validator";
import {Api_failure, Api_success} from "../models/api_models";
import {getCryptoSigning, SigningType} from "../encryption/crypto.signing";
import {Dao_provider} from '../db/dao_provider';
import {DatabaseFactory, DatabaseType} from "../db/database";
import {RegisterApiValidator} from "../validators/register.api.validator";
import {Register_user, User} from "../models/user_models";
import {error} from "password-validator/typings/constants";
import password = error.password;


const  userDao = Dao_provider.getInstance().userDao;

const registerRouter = express.Router();


registerRouter.post('/', async function(req :any ,res: any){
   const validationErrorMessage = RegisterApiValidator.validateRegisterGetRequest(req.body)
   try {
       if (validationErrorMessage != undefined) {
           res.status(400).send(new Api_failure("Invalid Request params", validationErrorMessage, ""))
       } else {
            const newRegisteredUser = Register_user.fromResponse(req.body);
            const hashedPassword = await getCryptoSigning(SigningType.JWT).hashPassword(newRegisteredUser.password);
            const rowAffected = await userDao.registerNewUser(
                newRegisteredUser.copyWith({password : hashedPassword}))
            res.send(new Api_success("User has successfully created", {
                user : User.fromResponse(newRegisteredUser)
            }));
       }
   }catch (e) {
       res.status(500).send(new Api_failure("Something went wrong",{},"Some error has occurred"))
   }
});


module.exports = registerRouter
