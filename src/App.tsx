import './App.scss';
import { Provider, useInjection } from 'inversify-react';
import { createContainer } from './lib/Container';
import { useEffect, useState } from 'react';
import { addSdkToBody } from './addSdkToBody';
import { IAuthenticationToken } from './lib/infrastructure/authentication/IAuthenticationToken';

export function App() {
  useEffect(addSdkToBody, []);

  return (
    <Provider container={createContainer}>
      <div className="App">
        <Test/>
      </div>
    </Provider>
  )
}

function Test() {
  const authenticationToken = useInjection<IAuthenticationToken>(IAuthenticationToken.$);
  const [value, setValue] = useState('nothing');
  useEffect(() => {
    authenticationToken.value().then(setValue, () => setValue('error'));
  }, []);
  return (
    <p>{value}</p>
  )
}
