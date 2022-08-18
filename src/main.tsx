import 'reflect-metadata';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { App } from './App';

declare global {
    interface Window {
        onSpotifyWebPlaybackSDKReady: () => void;
    }

    var Spotify: any;
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
