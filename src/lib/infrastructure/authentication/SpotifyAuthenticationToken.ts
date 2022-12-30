import { inject, injectable } from 'inversify';
import { IAuthenticationToken } from './IAuthenticationToken';
import { ILoginQueryFactory } from './login/ILoginQueryFactory';
import { redirect } from './login/Token';

@injectable()
export class SpotifyAuthenticationToken implements IAuthenticationToken {
    constructor(@inject(ILoginQueryFactory.$) private _loginQueryFactory: ILoginQueryFactory) {}

    async value(): Promise<string> {
        const code = new URLSearchParams(window.location.search).get('code');

        if (!code) {
            redirect();
            return Promise.reject();
        }

        const query = this._loginQueryFactory.createGetTokenQuery(code);
        const { accessToken } = await query.execute();
        return accessToken;
    }
}
