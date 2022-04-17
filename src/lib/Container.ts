import { Container } from "inversify";
import { IAuthenticationToken } from "./infrastructure/authentication/IAuthenticationToken";
import { SpotifyAuthenticationToken } from "./infrastructure/authentication/SpotifyAuthenticationToken";

export function createContainer(): Container {
    const container = new Container();
    container.bind(IAuthenticationToken.$).toService(SpotifyAuthenticationToken);
    return container;
}