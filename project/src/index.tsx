import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Setting } from './const';
import { offers } from './mock/offers';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App cardsOnPage={Setting.CARDS_ON_PAGE} offers={offers} />
  </React.StrictMode>,
);
