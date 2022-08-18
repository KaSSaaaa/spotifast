import { Container } from 'inversify';
import { IPlayer } from './domain/player/IPlayer';
import { IAuthenticationToken } from './infrastructure/authentication/IAuthenticationToken';
import { AzureLoginQueryFactory } from './infrastructure/authentication/Login/Azure/AzureLoginQueryFactory';
import { ILoginQueryFactory } from './infrastructure/authentication/Login/ILoginQueryFactory';
import { SpotifyAuthenticationToken } from './infrastructure/authentication/SpotifyAuthenticationToken';
import { SpotifyPlayer } from './infrastructure/player/SpotifyPlayer';

export function createContainer(): Container {
    const container = new Container();
    container.bind(IAuthenticationToken.$).to(SpotifyAuthenticationToken).inSingletonScope();
    container.bind(IPlayer.$).to(SpotifyPlayer).inSingletonScope();
    container.bind(ILoginQueryFactory.$).to(AzureLoginQueryFactory).inSingletonScope();
    container.get(IPlayer.$);
    return container;
}
