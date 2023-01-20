import type { RepeatState } from './RepeatState';

export interface IPlayer {
    togglePlay(): Promise<void>;
    readonly playing: boolean;
    next(): Promise<void>;
    previous(): Promise<void>;
    toggleShuffle(): Promise<void>;
    readonly shuffling: boolean;
    toggleRepeat(): Promise<void>;
    readonly repeatState: RepeatState;
}

export namespace IPlayer {
    export const $ = Symbol('IPlayer');
}
