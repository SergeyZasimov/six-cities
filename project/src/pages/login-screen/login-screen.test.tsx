import { createMemoryHistory } from 'history';
import { ApiRoute, AuthorizationStatus, DEFAULT_CITIES, DomainNameSpace } from '../../const';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-router/history-router';
import LoginScreen from './login-screen';
import { createMockOffers } from '../../faker-mocks/create-mock-offer';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();

const store = mockStore({
  [DomainNameSpace.User]: { authorizationStatus: AuthorizationStatus.NoAuth },
  [DomainNameSpace.Favorites]: {
    favoriteOffers: createMockOffers(3, { isFavorite: true })
  }
});

describe('LoginScreen: Render', () => {
  it('should render LoginScreen when user navigate to "/login" url', () => {
    const history = createMemoryHistory();
    history.push(ApiRoute.Login);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LoginScreen cities={DEFAULT_CITIES} />
        </HistoryRouter>
      </Provider>
    );

    const headerElement = screen.getByRole('heading', { name: 'Sign in' });
    const loginInputElement = screen.getByTestId('login');
    const passwordInputElement = screen.getByTestId('password');

    expect(headerElement).toBeInTheDocument();
    expect(loginInputElement).toBeInTheDocument();
    expect(passwordInputElement).toBeInTheDocument();
  });

  it('should display entered value', async () => {
    const history = createMemoryHistory();
    history.push(ApiRoute.Login);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LoginScreen cities={DEFAULT_CITIES} />
        </HistoryRouter>
      </Provider>
    );

    const loginInputElement = screen.getByTestId('login');
    const passwordInputElement = screen.getByTestId('password');

    await userEvent.type(loginInputElement, 'user');
    await userEvent.type(passwordInputElement, 'qwerty');

    expect(screen.getByDisplayValue(/user/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/qwerty/i)).toBeInTheDocument();
  });
});
