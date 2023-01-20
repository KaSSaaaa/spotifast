import { injectable } from 'inversify';
import type { ICommand } from '../../../ICommand';
import type { ILoginQueryFactory } from '../ILoginQueryFactory';
import { AzureGetTokenQuery } from './AzureGetTokenQuery';
import { AzureRefreshTokenQuery } from './AzureRefreshTokenQuery';
import type { Token } from '../Token';

@injectable()
export class AzureLoginQueryFactory implements ILoginQueryFactory {
    constructor() {}
    createGetTokenQuery(code: string): ICommand<Token> {
        return new AzureGetTokenQuery(code);
    }

    createRefreshTokenQuery(refreshToken: string): ICommand<Token> {
        return new AzureRefreshTokenQuery(refreshToken);
    }
}
