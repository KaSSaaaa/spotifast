import { ICommand } from "../../ICommand";
import { Token } from "./Token";

export interface ILoginQueryFactory {
    createGetTokenQuery(code: string): ICommand<Token>;
    createRefreshTokenQuery(refreshToken: string): ICommand<Token>;
}

export namespace ILoginQueryFactory {
    export const $ = Symbol('ILoginQueryFactory');
}