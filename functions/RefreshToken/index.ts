import { Context, HttpRequest } from "@azure/functions"
import axios from "axios";
import requestHeaders from "../RequestHeaders";
import responseHeaders from "../ResponseHeaders";

export default async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        const { refreshToken } = req.query;
    
        context.res = {
            headers: responseHeaders
        };
    
        const response = await axios.post('https://accounts.spotify.com/api/token', null, {
            params: {
                refresh_token: refreshToken,
                grant_type: 'refresh_token'
            },
            headers: requestHeaders
        });
    
        context.res = {
            ...context.res,
            status: 200,
            body: JSON.stringify(response.data)
        };
    } catch(e) {
        context.res = {
            ...context.res,
            status: e.response.status,
            body: JSON.stringify(e.response.statusText)
        }
    }
};
