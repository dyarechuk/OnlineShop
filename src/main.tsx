import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { HashRouter } from 'react-router-dom';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import { productsFetch } from './features/productsSlice.ts';
import { getTotals } from './features/cartSlice.ts';

store.dispatch(productsFetch());
store.dispatch(getTotals());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
);
