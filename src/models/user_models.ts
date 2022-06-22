export class Register_user {

    public readonly name: string;
    public readonly age: number;
    public readonly email: string;
    public readonly phone_no: number;
    public readonly password: string;
    
    constructor(name: string, age: number, email: string, phone_no: number, password: string) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.phone_no = phone_no;
        this.password = password;
    }

    copyWith({name = undefined, age  = undefined, email  = undefined, phone_no  = undefined, password = undefined}): Register_user {
        return new Register_user(
            name == undefined ? this.name : name,
            age == undefined ? this.age : age,
            email == undefined ? this.email : email,
            phone_no == undefined ? this.phone_no : phone_no,
            password == undefined ? this.password : password
        );
    }

   static fromResponse(response: any): Register_user{
       if(response == undefined) return undefined;
       return new Register_user(
            response.name,
            response.age,
            response.email,
            response.phone_no,
            response.password
        );
    }
}


export class User {

    public readonly name: string;
    public readonly age: number;
    public readonly email: string;
    public readonly phone_no: number;


    constructor(name: string, age: number, email: string, phone_no: number) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.phone_no = phone_no;
    }

    copyWith(name?: string, age?: number, email?: string, phone_no?: number): User {
        return new User(
            name == undefined ? this.name : name,
            age == undefined ? this.age : age,
            email == undefined ? this.email : email,
            phone_no == undefined ? this.phone_no : phone_no
        );
    }

    static fromResponse(response: any): User{
        if(response == undefined) return undefined;
        return new User(
            response.name,
            response.age,
            response.email,
            response.phone_no
        );
    }
}


export class UserWithAuth {

    public readonly email: string;
    public readonly name: string;
    public readonly authToken: string;


    constructor(email: string, name: string, authToken: string) {
        this.email = email;
        this.name = name;
        this.authToken = authToken;
    }


    copyWith(email?: string, name?: string, authToken?: string): UserWithAuth {
        return new UserWithAuth(
            email == undefined ? this.email : email,
            name == undefined ? this.name : name,
            authToken == undefined ? this.authToken : authToken
        );
    }

    static fromResponse(response: any): UserWithAuth {
        if(response == undefined) return undefined;
        return new UserWithAuth(
            response.email,
            response.name,
            response.authToken,
        );
    }
}
