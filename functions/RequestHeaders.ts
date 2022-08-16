
const { CLIENT_ID, CLIENT_SECRET } = process.env;

export default {
    Authorization: `Basic ${Buffer.from((`${CLIENT_ID}:${CLIENT_SECRET}`)).toString('base64')}`,
    'Content-Type': 'application/x-www-form-urlencoded'
}