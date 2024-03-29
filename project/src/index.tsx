import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { DEFAULT_CITIES } from './const';
import { store } from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchOffersAction } from './store/offers-process/async-actions';
import { fetchFavoriteOffers } from './store/favotires-process/async-actions';
import { checkAuthAction } from './store/user-process/async-actions';
import HistoryRouter from './components/history-router/history-router';
import { browserHistory } from './browser-history';

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());
store.dispatch(fetchFavoriteOffers());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <App cities={DEFAULT_CITIES} />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
