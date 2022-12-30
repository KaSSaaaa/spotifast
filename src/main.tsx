import 'reflect-metadata';
import { StrictMode } from 'react';
import './index.scss';
import { App } from './App';
import './globals';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
