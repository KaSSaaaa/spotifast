import { injectable } from 'inversify';
import type { Palette } from '../../../domain/colorPalette/Palette';
import type { ICommand } from '../../ICommand';
import type { IColorQueryFactory } from '../IColorQueryFactory';
import { AzureGetColorSchemeQuery } from './AzureGetColorSchemeQuery';

@injectable()
export class AzureColorQueryFactory implements IColorQueryFactory {
    createGetColorSchemeQuery(imageUrl: string): ICommand<Palette> {
        return new AzureGetColorSchemeQuery(imageUrl);
    }
}
