import { inject, injectable } from 'inversify';
import { action, makeAutoObservable } from 'mobx';
import type { IPlayer } from '../../domain/player/IPlayer';
import { IAuthenticationToken } from '../authentication/IAuthenticationToken';
import type { RepeatState } from '../../domain/player/RepeatState';

//TODO State pattern for using either web or existing playback

@injectable()
export class SpotifyPlayer implements IPlayer {
    private _player?: any;
    private _webPlayerDeviceId?: string;
    private _currentDeviceId?: string;
    private _shuffle: boolean = false;

    constructor(@inject(IAuthenticationToken.$) private _authenticationToken: IAuthenticationToken) {
        makeAutoObservable(this);
        window.onSpotifyWebPlaybackSDKReady = async () => {
            this._player = new Spotify.Player({
                name: 'Spotifast',
                getOAuthToken: async (cb: any) => {
                    cb(await this._authenticationToken.value());
                },
            });
            if (import.meta.env.DEV) {
                // Error handling
                this._player.addListener('initialization_error', ({ message }: any) => console.error(message));
                this._player.addListener('authentication_error', ({ message }: any) => console.error(message));
                this._player.addListener('account_error', ({ message }: any) => console.error(message));
                this._player.addListener('playback_error', ({ message }: any) => console.error(message));

                // Not Ready
                this._player.addListener('not_ready', ({ device_id }: any) =>
                    console.log('Device ID has gone offline', device_id)
                );
            }

            // Playback status updates
            this._player.addListener('player_state_changed', (state: any) => this.onPlayerStateChanged(state));

            // Ready
            this._player.addListener('ready', async ({ device_id }: any) => {
                const { data, status } = await fetch('https://api.spotify.com/v1/me/player', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${await this._authenticationToken.value()}`,
                    },
                }).then(async (response) => {
                    return {
                        data: await response.json(),
                        status: response.status,
                    };
                });

                if (status !== 204) this._currentDeviceId = data.device.id;
                console.log(data);

                this._webPlayerDeviceId = device_id;
            });

            // Connect to the player!
            await this._player.connect();
            console.log(await this._player);
        };
    }

    async togglePlay(): Promise<void> {
        if (this._currentDeviceId !== this._webPlayerDeviceId) {
            // await axios.put(
            //     `https://api.spotify.com/v1/me/player/play?device_id=${this._currentDeviceId}`,
            //     {
            //         // uris: ['spotify:track:3AzjcOeAmA57TIOr9zF1ZW'],
            //     },
            //     {
            //         headers: {
            //             'Content-Type': 'application/json',
            //             Authorization: `Bearer ${await this._authenticationToken.value()}`,
            //         },
            //     }
            // );
        } else {
            this._player?.togglePlay();
        }
    }

    get playing(): boolean {
        return false;
    }

    async next(): Promise<void> {
        await this._player.nextTrack();
    }

    async previous(): Promise<void> {
        await this._player.previousTrack();
    }

    toggleShuffle(): Promise<void> {
        throw new Error('Method not implemented.');
    }

    get shuffling(): boolean {
        return this._shuffle;
    }

    toggleRepeat(): Promise<void> {
        throw new Error('Method not implemented.');
    }

    get repeatState(): RepeatState {
        return this._player;
    }

    private async onPlayerStateChanged(state: any) {
        if (!state) return;

        this._currentDeviceId = this._webPlayerDeviceId;

        console.log(state);
        action(() => {
            this._shuffle = state.shuffle;
        })();
    }
}
