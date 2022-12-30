import { Router as RemixRouter } from '@remix-run/router';

export type Router = RemixRouter;

export namespace Router {
    export const $ = Symbol.for('Router');
}
