import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import './index.css'
import App from './App.jsx'
import './config/firebase'; // Initialize Firebase
import { DataProvider } from './context/DataContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <DataProvider>
          <App />
        </DataProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
