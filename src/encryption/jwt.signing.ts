import {CryptoSigning} from "./crypto.signing";
import * as cryptoHash from 'bcryptjs';
import * as jwtToken from  'jsonwebtoken';

export class JWTCryptoSigning implements  CryptoSigning {


    generateAuthToken(userPayload: string, clientSecret): string {
        try {
            return jwtToken.sign(userPayload,clientSecret);
        }catch (e){
            console.log("Error while signing auth token")
        }
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
