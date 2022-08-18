import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import Vibrant from 'node-vibrant';
import { IColorPalette } from './IColorPalette';

@injectable()
export class VibrantColorPalette implements IColorPalette {
    private _light: string = '';
    private _dark: string = '';
    private _vibrant: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    from(image: string): Promise<void> {
        return new Promise((resolve, reject) => {
            Vibrant.from(image)
                .getPalette()
                .then((val) => {
                    this._light = val.LightVibrant?.getHex()!;
                    this._dark = val.DarkVibrant?.getHex()!;
                    this._vibrant = val.Vibrant?.getHex()!;
                    resolve();
                }, reject);
        });
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
