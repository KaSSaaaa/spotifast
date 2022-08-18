export interface IColorPalette {
    readonly light: string;
    readonly dark: string;
    readonly vibrant: string;

    from(image: string): Promise<void>;
}

export namespace IColorPalette {
    export const $ = Symbol.for('IColorPalette');
}
