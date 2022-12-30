export const REDIRECT_URI: string = import.meta.env.VITE_REDIRECT_URI;
export const AUTH_URL = import.meta.env.VITE_API_URL;
export const CLIENT_ID: string = '18ae34bd3f4349a79b8a27a0caae7601';
export const SCOPE: string =
    'playlist-read-private playlist-read-collaborative streaming user-modify-playback-state playlist-modify-private playlist-modify-public user-read-playback-state user-read-email user-read-private';

export function redirect() {
    const redirectUrl =
        'https://accounts.spotify.com/authorize?' +
        `client_id=${CLIENT_ID}&` +
        'response_type=code&' +
        `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
        `scope=${encodeURIComponent(SCOPE)}`;

    window.location.href = redirectUrl;
}

export type Token = {
    refreshToken: string;
    accessToken: string;
    expiresIn: number;
};
