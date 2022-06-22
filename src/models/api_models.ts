export class Api_success<Data> {

    public readonly statusCode:string = API_RESPONSE.SUCCESS;

    constructor(
        public readonly message: string,
        public readonly data: Data
        ) {}
}

export  class Api_failure<Data> {
    public readonly statusCode:string =  API_RESPONSE.FAILURE;

    constructor(
        public readonly message: string,
        public readonly data: Data,
        public readonly reason: string
    ) {
    }
}


export const API_RESPONSE = {
  SUCCESS  : "SUCCESS",
  FAILURE : "FAILURE"
};
Object.freeze(API_RESPONSE);

