import type { ICommand } from '../../../ICommand';
import { AUTH_URL, redirect, SCOPE, type Token } from '../Token';

export class AzureRefreshTokenQuery implements ICommand<Token> {
    constructor(private _refreshToken: string) {}
    async execute(): Promise<Token> {
        const { access_token, expires_in, scope } = await (
            await fetch(`${AUTH_URL}/api/RefreshToken?refreshToken=${this._refreshToken}`)
        ).json();

        if (scope !== SCOPE) {
            redirect();
            return Promise.reject();
        }

        return {
            refreshToken: this._refreshToken,
            accessToken: access_token,
            expiresIn: expires_in,
        };
    }
}
