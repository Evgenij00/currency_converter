import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { CurrencyServiceProvider } from './components/currency-service-context';
import CurrencyService from './services/currency-service';
import store from './store';

const service = new CurrencyService()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CurrencyServiceProvider value={service}>
        <App />
      </CurrencyServiceProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
