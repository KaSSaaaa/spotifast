import './App.scss';
import { Provider } from 'inversify-react';
import { createContainer } from './lib/Container';
import { useEffect } from 'react';

export function App() {
  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {

    };
  }, []);

  return (
    <Provider container={createContainer}>
      <div className="App">
        <p>Hello there</p>
      </div>
    </Provider>
  )
}
