import 'reflect-metadata';
import './app.scss';
import App from './App.svelte';
import { addSdkToBody } from './addSdkToBody';

const app = new App({
    target: document.getElementById('app'),
});

addSdkToBody();

export default app;
