import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../src/styles/index.css';
import { App } from './App';
import './styles.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Kofa documentation root was not found.');
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
