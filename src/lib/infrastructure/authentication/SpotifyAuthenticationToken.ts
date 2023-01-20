import { inject, injectable } from 'inversify';
import type { IAuthenticationToken } from './IAuthenticationToken';
import { ILoginQueryFactory } from './login/ILoginQueryFactory';
import { redirect } from './login/Token';
import { replace } from 'svelte-spa-router';

@injectable()
export class SpotifyAuthenticationToken implements IAuthenticationToken {
    private _value?: string;

    constructor(@inject(ILoginQueryFactory.$) private _loginQueryFactory: ILoginQueryFactory) {}

    async value(): Promise<string> {
        if (!this._value) {
            const code = new URLSearchParams(window.location.search).get('code');

            if (!code) {
                redirect();
                return Promise.reject();
            }
            const query = this._loginQueryFactory.createGetTokenQuery(code!);
            const { accessToken } = await query.execute();
            this._value = accessToken;

            replace('/');
        }
        return this._value;
    }
}
