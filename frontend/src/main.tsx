import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import 'bootstrap/dist/css/bootstrap.min.css';
// @ts-ignore
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
(window as any).bootstrap = bootstrap;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
