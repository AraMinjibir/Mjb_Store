export class User {

    constructor(
        public email:string,
        public id:string,
        private _expiresIn: Date,
        private _token: string,

    ){
        
    }

    get token(){

        if(!this._expiresIn || this._expiresIn < new Date()){
            return null;
        }
        return this._token;
    }
}
