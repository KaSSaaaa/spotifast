import { inject, injectable } from 'inversify';
import { IAuthenticationToken } from './IAuthenticationToken';
import { ILoginQueryFactory } from './login/ILoginQueryFactory';
import { Token, redirect } from './login/Token';
import { Router } from '../../presentation/router/Router';

@injectable()
export class SpotifyAuthenticationToken implements IAuthenticationToken {
    private _value?: string;

    constructor(
        @inject(ILoginQueryFactory.$) private _loginQueryFactory: ILoginQueryFactory,
        @inject(Router.$) private _router: Router
    ) {}

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

            this._router.navigate('/');
        }
        return this._value;
    }
}
