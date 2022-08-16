import { Context, HttpRequest } from "@azure/functions"
import axios from 'axios';
import requestHeaders from "../RequestHeaders";
import responseHeaders from "../ResponseHeaders";

export default async function(context: Context, req: HttpRequest): Promise<void> {
    try {
        const { code } = req.query;
        
        context.res = {
            headers: responseHeaders
        };

        const response = await axios.post('https://accounts.spotify.com/api/token', null, {
            params: {
                code,
                redirect_uri: process.env.REDIRECT_URI,
                grant_type: 'authorization_code'
            },
            headers: requestHeaders
        });
    
        context.res = {
            ...context.res,
            status: 200,
            body: JSON.stringify(response.data),
        };
    } catch(e) {
        context.log(e.response.status, e.response.statusText, e.response.data);
        context.res = {
            ...context.res,
            status: e.response.status,
            body: JSON.stringify(e.response.statusText)
        }
    }
};