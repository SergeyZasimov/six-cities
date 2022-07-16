import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offers } from './mock/offers';

const Setting = {
  CARDS_ON_PAGE: 5
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App cardsOnPage={Setting.CARDS_ON_PAGE} offers={offers} />
  </React.StrictMode>,
);
