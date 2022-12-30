import { Provider } from 'inversify-react';
import { createContainer } from './lib/Container';
import { useEffect } from 'react';
import { addSdkToBody } from './addSdkToBody';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { MusicPlayer } from './lib/presentation/musicPlayer/MusicPlayer';

export function App() {
    useEffect(addSdkToBody, []);
    const router = createBrowserRouter(createRoutesFromElements([<Route path="/" element={<MusicPlayer />} />]));
    const container = createContainer(router);

    return (
        <Provider container={container} key={container.id}>
            <RouterProvider router={router} />
        </Provider>
    );
}
