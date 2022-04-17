import { IAuthenticationToken } from "./IAuthenticationToken";

export class SpotifyAuthenticationToken implements IAuthenticationToken {
    value(): Promise<string> {
        throw new Error("Method not implemented.");
    }
}
