import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { Setting } from './const';
import { cities } from './mock/cities';
import { offers } from './mock/offers';
import { store } from './store';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App cardsOnPage={Setting.CardsOnPage} offers={offers} cities={Object.values(cities)} />
    </Provider>
  </React.StrictMode>,
);
