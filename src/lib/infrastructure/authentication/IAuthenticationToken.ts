export interface IAuthenticationToken {
    value(): Promise<string>;
}

export namespace IAuthenticationToken {
    export const $ = Symbol('IAuthenticationToken');
}
