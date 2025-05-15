import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
    domain="raishan.us.auth0.com"
    clientId="q1IcYKsDMMDVZClKO3gUfE0oiwLjinFh"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <BrowserRouter >
    
    <App />
    
    </BrowserRouter>
  </Auth0Provider>
  </StrictMode>
)
