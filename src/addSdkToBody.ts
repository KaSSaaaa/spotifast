const spotifySdkId = 'spotify-player';

export function addSdkToBody() {
    if(document.getElementById(spotifySdkId)) return;
    const script = document.createElement('script');
    script.id = spotifySdkId;
    script.src = import.meta.env.VITE_SPOTIFY_SDK_URL;
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);
}