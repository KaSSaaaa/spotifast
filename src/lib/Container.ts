import { Container } from "inversify";
import { IPlayer } from "./domain/player/IPlayer";
import { IAuthenticationToken } from "./infrastructure/authentication/IAuthenticationToken";
import { SpotifyAuthenticationToken } from "./infrastructure/authentication/SpotifyAuthenticationToken";
import { SpotifyPlayer } from "./infrastructure/player/SpotifyPlayer";

export function createContainer(): Container {
    const container = new Container();
    container.bind(IAuthenticationToken.$).to(SpotifyAuthenticationToken).inSingletonScope();
    container.bind(IPlayer.$).to(SpotifyPlayer).inSingletonScope();
    container.get(IPlayer.$);
    return container;
}