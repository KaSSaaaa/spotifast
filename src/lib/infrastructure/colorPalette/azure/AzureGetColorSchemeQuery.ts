import axios from 'axios';
import { ICommand } from '../../ICommand';
import { Palette } from '../../../domain/colorPalette/Palette';

export class AzureGetColorSchemeQuery implements ICommand<Palette> {
    constructor(private _image: string) {}

    async execute(): Promise<Palette> {
        const { data } = await axios.post<Palette>(`${import.meta.env.VITE_API_URL}/api/GetColorScheme`, {
            imageUrl: this._image,
        });
        return data;
    }
}
