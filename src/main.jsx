import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { createContext } from 'react';
import { UsernameContext } from './features/context.js';


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App />
  </>
)
