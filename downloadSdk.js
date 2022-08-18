const axios = require('axios');
const { writeFile } = require('fs/promises');

axios.get('https://sdk.scdn.co/spotify-player.js').then(async ({ data }) => {
    await writeFile('./dist/spotify-player.js', data);
});
