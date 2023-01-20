declare global {
    interface Window {
        onSpotifyWebPlaybackSDKReady: () => void;
    }

    var Spotify: any;
}

export {};
