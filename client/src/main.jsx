import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';


const onRedirectCallback = (appState) => {
  window.history.replaceState({}, document.title, appState?.returnTo || "/")
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
    domain="raishan.us.auth0.com"
    clientId="q1IcYKsDMMDVZClKO3gUfE0oiwLjinFh"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    useRefreshTokens={true}
    cacheLocation='localstorage'
    onRedirectCallback={onRedirectCallback}
  >
    <BrowserRouter >
    
    <App />
    
    </BrowserRouter>
  </Auth0Provider>
  </StrictMode>
)


