import { Context, HttpRequest } from '@azure/functions';
import responseHeaders from '../ResponseHeaders';
import Vibrant = require('node-vibrant');

export default async function (context: Context, req: HttpRequest): Promise<void> {
    context.res = {
        headers: responseHeaders,
    };
    try {
        if (!req.body.imageUrl) throw new Error('Image URL not found');
        try {
            const palette = await Vibrant.from(req.body.imageUrl).getPalette();

            context.res = {
                ...context.res,
                body: {
                    vibrant: palette.Vibrant.hex,
                    muted: palette.Muted.hex,
                    lightMuted: palette.LightMuted.hex,
                    darkMuted: palette.DarkMuted.hex,
                    lightVibrant: palette.LightVibrant.hex,
                    darkVibrant: palette.DarkVibrant.hex,
                },
            };
        } catch (error) {
            throw new Error();
        }
    } catch (err) {
        let error = err.message;
        if (!error) error = `Impossible to analyse image ${req.body.imageUrl}`;
        context.res = {
            ...context.res,
            status: 401,
            body: {
                error,
            },
        };
    }
}
