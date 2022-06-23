import {Api_failure} from "../models/api_models";
import {validateAuthToken, validateEmail} from "../validators/basic_validator";
import {Dao_provider} from "../db/dao_factory";
import {DatabaseFactory, DatabaseType} from "../db/database";
import {getCryptoSigning, SigningType} from "../encryption/crypto.signing";


const  userDao = new Dao_provider(DatabaseFactory
    .getDatabaseInstance(DatabaseType.SQLITE))
    .userDao;

export const getMiddleWareFunction = async (req,res,next) =>{
       const authToken  = req.headers["auth-token"];
       const userEmail = req.headers["email"];
       const authValidator =  validateAuthToken(authToken);
       const authEmail = validateEmail(userEmail,true);
       if(authValidator != undefined){
           res.status(400).send(new Api_failure("Invalid Request",authValidator,"Provided request has not valid"))
           return;
       }
       if(authEmail != undefined){
           res.status(400).send(new Api_failure("Invalid Request",authEmail,"Provided request has not valid"))
           return;
       }
       const token = authToken.replace("Bearer","").trim();
       const user = await userDao.findUserByEmail(userEmail);
       if(user == undefined){
           res.status(400).send(new Api_failure("Invalid Request",{
               validation: "Invalid User",
               message: "Requested user is not valid"},"Provided request has not valid"))
        return;
       }
    const cyptoSigning = getCryptoSigning(SigningType.JWT);
    if(!cyptoSigning.verifyAuthToken(token,user,"3f4779c8-a7b9-445c-94b4-631ffbe59c14")){
           res.status(400).send(new Api_failure("Invalid Request",{
               validation: "Invalid User Authorization",
               message: "Requested user details are not authorized"},"Requested user details are not authorized"))
         return;
       }
       next();
    }
