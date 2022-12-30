import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { IPlayer } from '../../domain/player/IPlayer';
import { IAuthenticationToken } from '../authentication/IAuthenticationToken';

@injectable()
export class SpotifyPlayer implements IPlayer {
    private _player?: any;
    private _deviceId?: string;

    constructor(
        @inject(IAuthenticationToken.$)
        private _authenticationToken: IAuthenticationToken
    ) {
        makeAutoObservable(this);
        window.onSpotifyWebPlaybackSDKReady = () => {
            this._player = new Spotify.Player({
                name: 'Sortify',
                getOAuthToken: async (cb: any) => {
                    cb(await this._authenticationToken.value());
                },
            });
            // Error handling
            this._player.addListener('initialization_error', ({ message }: any) => console.error(message));
            this._player.addListener('authentication_error', ({ message }: any) => console.error(message));
            this._player.addListener('account_error', ({ message }: any) => console.error(message));
            this._player.addListener('playback_error', ({ message }: any) => console.error(message));

            // Not Ready
            this._player.addListener('not_ready', ({ device_id }: any) =>
                console.log('Device ID has gone offline', device_id)
            );

            // Playback status updates
            this._player.addListener('player_state_changed', (state: any) => this.onPlayerStateChanged(state));

            // Ready
            this._player.addListener('ready', ({ device_id }: any) => (this._deviceId = device_id));

            // Connect to the player!
            this._player.connect();
        };
    }

    private async onPlayerStateChanged(state: any) {
        if (!state) return;

        console.log(state);

        const playlistId = state.context.uri.replace('spotify:playlist:', '');
        const linkedId = state.track_window.current_track.linked_from.id;
        const trackId = state.track_window.current_track.id;
    }
}
