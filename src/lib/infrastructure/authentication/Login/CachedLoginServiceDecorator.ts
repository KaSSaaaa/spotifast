import { inject } from "inversify";
import { ILoginQueryFactory } from "./ILoginQueryFactory";
import { ILoginService } from "./ILoginService";
import { Token } from "./Token";

const TOKEN: string = 'token';

export class CachedLoginServiceDecorator implements ILoginService {

    constructor(
        private _loginService: ILoginService,
        @inject(ILoginQueryFactory.$) private _loginQueryFactory: ILoginQueryFactory,
    ) {

    }

    async token(): Promise<Token> {
        let token = this.fromStorage();

        if(!token) {
            token = await this._loginService.token();
            token = this.setInStorage(token);
        } else if (Date.now() > token.expiresIn) {
            token = await this.refreshToken(token);
        }

        return token;
    }

    private fromStorage(): Token | undefined {
        let token: any = localStorage.getItem(TOKEN);
        return token ? JSON.parse(Buffer.from(token, 'base64').toString()) : undefined;
    }

    private setInStorage(token: Token): Token {
        const date = new Date();
        date.setSeconds(date.getSeconds() + token.expiresIn);

        token = {
            refreshToken: token.refreshToken,
            accessToken: token.accessToken,
            expiresIn: date.getTime()
        };

        localStorage.setItem(TOKEN, Buffer.from(JSON.stringify(token), 'base64').toString());

        return token;
    }

    private async refreshToken(token: Token): Promise<Token> {
        const query = this._loginQueryFactory.createRefreshTokenQuery(token.refreshToken);
        token = await query.execute();
        this.setInStorage(token);
        return token;
    }
}
