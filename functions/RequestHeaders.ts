
const { CLIENT_ID, CLIENT_SECRET } = process.env;

export default {
    Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
    'Content-Type': 'application/x-www-form-urlencoded'
}