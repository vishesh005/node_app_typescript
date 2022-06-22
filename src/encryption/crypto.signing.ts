import {JWTCryptoSigning} from "./jwt.signing";

export interface CryptoSigning {
    hashPassword(password: string): Promise<string>
    generateAuthToken(userPayload:string, clientSecret): string
    matchHashedValue(unHashedValue:string, hashedValue: string): boolean
}



export function getCryptoSigning(signing: SigningType){
    switch (signing){
        case SigningType.JWT:
            return new JWTCryptoSigning();
            break;
        default:
            return new JWTCryptoSigning();
            break;
    }
}

export enum SigningType{
    JWT
}
