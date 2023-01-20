import { writeFile } from 'fs/promises';

await fetch('https://sdk.scdn.co/spotify-player.js').then(async (response) => {
    await writeFile('./dist/spotify-player.js', await response.text());
});
