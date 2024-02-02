import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import store from "./store"
import { Provider } from 'react-redux';

store.subscribe(()=>console.log(store.getState()));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
  
);

reportWebVitals();
