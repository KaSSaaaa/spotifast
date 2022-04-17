/// <reference types="vite/client" />

declare global {
    interface Window {
        onSpotifyWebPlaybackSDKReady: () => void;
    }
}