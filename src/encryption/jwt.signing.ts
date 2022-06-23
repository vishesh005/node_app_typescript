import {CryptoSigning} from "./crypto.signing";
import * as cryptoHash from 'bcryptjs';
import * as jwtToken from  'jsonwebtoken';

const expiryTime = '5m';

export class JWTCryptoSigning implements  CryptoSigning {

    generateAuthToken(userPayload: object, clientSecret): string {
        try {
            return jwtToken.sign(userPayload,clientSecret,{expiresIn: expiryTime});
        }catch (e){
            console.log("Error while signing auth token")
        }
    }

    verifyAuthToken(token: string, properties : object,clientSecret): boolean {
        var verified = true;
        try {
            const tokenObject =  jwtToken.verify(token,clientSecret);
            const keys = Object.keys(properties);
            for (let i = 0 ;i <keys.length; i++){
                const value =  properties[keys[i]];
                const tokenValue = tokenObject.user[keys[i]];
                if(value != tokenValue){
                    verified = false;
                }
            }
        }catch (e){
            console.log("Error while signing auth token")
            verified = false;
        }
        return verified;
    }

    async hashPassword(password: string): Promise<string> {
        try {
            const salt = await cryptoHash.genSalt(10)
            return cryptoHash.hash(password, salt);
        }catch (e){
            console.log("Error while hashing password")
        }
    }

    matchHashedValue(unHashedValue: string, hashedValue: string): boolean {
        try {
            return cryptoHash.compare(unHashedValue, hashedValue);
        }catch (e) {
            console.log("Error while comparing hash data");
            return false;
        }
    }

}
