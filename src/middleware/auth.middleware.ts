import {Api_failure} from "../models/api_models";
import {validateAuthToken, validateEmail} from "../validators/basic_validator";
import {Dao_provider} from "../db/dao_provider";
import {getCryptoSigning, SigningType} from "../encryption/crypto.signing";


const  userDao = Dao_provider.getInstance().userDao;

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
    if(!cyptoSigning.verifyAuthToken(token,user,process.env.CLIENT_SECRET)){
           res.status(400).send(new Api_failure("Invalid Request",{
               validation: "Invalid User Authorization",
               message: "Requested user details are not authorized"},"Requested user details are not authorized"))
         return;
       }
       next();
    }
