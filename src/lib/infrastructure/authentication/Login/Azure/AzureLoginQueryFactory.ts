import { injectable } from 'inversify';
import { ICommand } from '../../../ICommand';
import { Token } from '../Token';
import { ILoginQueryFactory } from './../ILoginQueryFactory';
import { AzureGetTokenQuery } from './AzureGetTokenQuery';
import { AzureRefreshTokenQuery } from './AzureRefreshTokenQuery';

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
