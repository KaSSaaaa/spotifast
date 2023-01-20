import type { ICommand } from '../../ICommand';
import type { Palette } from '../../../domain/colorPalette/Palette';

export class AzureGetColorSchemeQuery implements ICommand<Palette> {
    constructor(private _image: string) {}

    async execute(): Promise<Palette> {
        return await fetch(`${import.meta.env.VITE_API_URL}/api/GetColorScheme`, {
            method: 'POST',
            body: JSON.stringify({
                imageUrl: this._image,
            }),
        }).then((response) => response.json());
    }
}
