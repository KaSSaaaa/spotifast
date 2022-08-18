import { Provider } from 'inversify-react';
import { createContainer } from './lib/Container';
import { useEffect } from 'react';
import { addSdkToBody } from './addSdkToBody';
import { MusicPlayer } from './lib/presentation/MusicPlayer';

export function App() {
    useEffect(addSdkToBody, []);

    return (
        <Provider container={createContainer}>
            <MusicPlayer />
        </Provider>
    );
}
