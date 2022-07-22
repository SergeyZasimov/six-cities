import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Setting } from './const';
import { cities } from './mock/cities';
import { offers } from './mock/offers';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App cardsOnPage={Setting.CardsOnPage} offers={offers} cities={Object.values(cities)} />
  </React.StrictMode>,
);
