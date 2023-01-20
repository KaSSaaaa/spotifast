import type { Palette } from '../../domain/colorPalette/Palette';
import type { ICommand } from '../ICommand';

export interface IColorQueryFactory {
    createGetColorSchemeQuery(imageUrl: string): ICommand<Palette>;
}

export namespace IColorQueryFactory {
    export const $ = Symbol.for('IColorQueryFactory');
}
