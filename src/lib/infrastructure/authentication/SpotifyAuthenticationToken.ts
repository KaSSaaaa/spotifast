import { injectable } from "inversify";
import { IAuthenticationToken } from "./IAuthenticationToken";

@injectable()
export class SpotifyAuthenticationToken implements IAuthenticationToken {
    value(): Promise<string> {
        throw new Error("Method not implemented.");
    }
}
