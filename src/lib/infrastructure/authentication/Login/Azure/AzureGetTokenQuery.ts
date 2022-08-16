import axios from "axios";
import { ICommand } from "../../../ICommand";
import { AUTH_URL, redirect, SCOPE, Token } from "../Token";

export class AzureGetTokenQuery implements ICommand<Token> {
    constructor(
        private _code: string
    ) {

    }

    async execute(): Promise<Token> {
        const { 
            access_token, 
            refresh_token, 
            expires_in, 
            scope 
        } = (await axios.get(`${AUTH_URL}/api/GetToken?code=${this._code}`)).data;

        if (scope !== SCOPE) {
            redirect();
            return Promise.reject();
        }

        return {
            accessToken: access_token,
            refreshToken: refresh_token,
            expiresIn: expires_in
        }
    }
}