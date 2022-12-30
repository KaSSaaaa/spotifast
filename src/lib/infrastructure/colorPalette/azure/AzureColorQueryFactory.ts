import { injectable } from 'inversify';
import { Palette } from '../../../domain/colorPalette/Palette';
import { ICommand } from '../../ICommand';
import { IColorQueryFactory } from './../IColorQueryFactory';
import { AzureGetColorSchemeQuery } from './AzureGetColorSchemeQuery';

@injectable()
export class AzureColorQueryFactory implements IColorQueryFactory {
    createGetColorSchemeQuery(imageUrl: string): ICommand<Palette> {
        return new AzureGetColorSchemeQuery(imageUrl);
    }
}
