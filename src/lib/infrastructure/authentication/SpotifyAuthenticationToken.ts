import { inject, injectable } from "inversify";
import { IAuthenticationToken } from "./IAuthenticationToken";
import { ILoginQueryFactory } from "./Login/ILoginQueryFactory";
import { redirect } from "./Login/Token";

@injectable()
export class SpotifyAuthenticationToken implements IAuthenticationToken {
    constructor(
        @inject(ILoginQueryFactory.$) private _loginQueryFactory: ILoginQueryFactory
    ) {

    }

    async value(): Promise<string> {
        const code = new URLSearchParams(window.location.search).get('code');
        console.log(code);
        
        if(!code) {
            redirect();
            return Promise.reject();
        }

        const query = this._loginQueryFactory.createGetTokenQuery(code);
        const { accessToken } = await query.execute();
        return accessToken;
    }
}
