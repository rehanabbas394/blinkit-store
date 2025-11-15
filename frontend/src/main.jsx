import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import router from './routes/router.jsx';
import {RouterProvider} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store/store.js';
import GlobalProvider from './Provider/globalProvider'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GlobalProvider>
      <RouterProvider router ={router} />
    </GlobalProvider>
  </Provider>,
)
