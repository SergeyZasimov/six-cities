import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { cities } from './mock/cities';
import { offers } from './mock/offers';
import { store } from './store';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={offers} cities={Object.values(cities)} />
    </Provider>
  </React.StrictMode>,
);
