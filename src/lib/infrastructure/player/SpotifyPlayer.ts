import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { IPlayer } from '../../domain/player/IPlayer';
import { IAuthenticationToken } from '../authentication/IAuthenticationToken';

@injectable()
export class SpotifyPlayer implements IPlayer {
    private readonly _player?: any;

    constructor(
        @inject(IAuthenticationToken.$)
        private _authenticationToken: IAuthenticationToken
    ) {
        makeAutoObservable(this);
        window.onSpotifyWebPlaybackSDKReady = () => {};
    }
}
