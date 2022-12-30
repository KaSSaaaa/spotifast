import { ColorPalette } from './infrastructure/colorPalette/ColorPalette';
import { Container } from 'inversify';
import { IPlayer } from './domain/player/IPlayer';
import { IAuthenticationToken } from './infrastructure/authentication/IAuthenticationToken';
import { AzureLoginQueryFactory } from './infrastructure/authentication/login/azure/AzureLoginQueryFactory';
import { SpotifyAuthenticationToken } from './infrastructure/authentication/SpotifyAuthenticationToken';
import { SpotifyPlayer } from './infrastructure/player/SpotifyPlayer';
import { IColorPalette } from './domain/colorPalette/IColorPalette';
import { IColorQueryFactory } from './infrastructure/colorPalette/IColorQueryFactory';
import { AzureColorQueryFactory } from './infrastructure/colorPalette/azure/AzureColorQueryFactory';
import { ILoginQueryFactory } from './infrastructure/authentication/login/ILoginQueryFactory';

export function createContainer(): Container {
    const container = new Container();
    container.bind(IAuthenticationToken.$).to(SpotifyAuthenticationToken).inSingletonScope();
    container.bind(IPlayer.$).to(SpotifyPlayer).inSingletonScope();
    container.bind(ILoginQueryFactory.$).to(AzureLoginQueryFactory).inSingletonScope();
    container.bind(IColorPalette.$).to(ColorPalette).inSingletonScope();
    container.bind(IColorQueryFactory.$).to(AzureColorQueryFactory).inSingletonScope();
    container.get(IPlayer.$);
    return container;
}
