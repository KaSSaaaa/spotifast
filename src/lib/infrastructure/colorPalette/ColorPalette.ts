import { inject, injectable } from 'inversify';
import { action, makeAutoObservable } from 'mobx';
import { IColorPalette } from '../../domain/colorPalette/IColorPalette';
import { IColorQueryFactory } from './IColorQueryFactory';

@injectable()
export class ColorPalette implements IColorPalette {
    private _light: string = '';
    private _dark: string = '';
    private _vibrant: string = '';

    constructor(@inject(IColorQueryFactory.$) private _colorQueryFactory: IColorQueryFactory) {
        makeAutoObservable(this);
    }

    async from(image: string): Promise<void> {
        const query = this._colorQueryFactory.createGetColorSchemeQuery(image);
        const { lightVibrant, darkVibrant, vibrant } = await query.execute();

        action(() => {
            this._light = lightVibrant;
            this._dark = darkVibrant;
            this._vibrant = vibrant;
        })();
    }

    get light(): string {
        return this._light;
    }

    get dark(): string {
        return this._dark;
    }

    get vibrant(): string {
        return this._vibrant;
    }
}
