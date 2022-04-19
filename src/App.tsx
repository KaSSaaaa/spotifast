import './App.scss';
import { Provider } from 'inversify-react';
import { createContainer } from './lib/Container';
import { useEffect } from 'react';
import { addSdkToBody } from './addSdkToBody';

export function App() {
  useEffect(addSdkToBody, []);

  return (
    <Provider container={createContainer}>
      <div className="App">
        <p>Hello there</p>
      </div>
    </Provider>
  )
}
