

export function addSdkToBody() {
    const script = document.createElement('script');
    script.src = import.meta.env.VITE_SPOTIFY_SDK_URL;
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);
}