import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import App from './app';
import {
  AppRoute,
  AuthorizationStatus,
  DEFAULT_CITIES,
  DomainNameSpace,
  LoadingStatus,
  SendingStatus
} from '../../const';
import { render, screen } from '@testing-library/react';
import { createMockOffer, createMockOffers } from '../../faker-mocks/create-mock-offer';
import { createMockCommentsList } from '../../faker-mocks/create-mock-comments';
import { createMockCity } from '../../faker-mocks/create-mock-city';
import React from 'react';


describe('App Routing with authorization user', () => {
  const mockHistory = createMemoryHistory();

  const mockStore = configureMockStore();

  const id = 1;

  const mockRoom = createMockOffer({ id });
  const mockCity = createMockCity({ name: 'Paris' });

  const store = mockStore({
    [DomainNameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      userName: 'Jack'
    },
    [DomainNameSpace.Offers]: {
      offers: createMockOffers(3, { city: mockCity }),
      status: LoadingStatus.Success
    },
    [DomainNameSpace.Room]: {
      room: mockRoom,
      status: LoadingStatus.Success
    },
    [DomainNameSpace.Favorites]: {
      favoriteOffers: createMockOffers(3, { isFavorite: true })
    },
    [DomainNameSpace.Location]: {
      currentLocation: mockCity.name
    },
    [DomainNameSpace.NearbyOffers]: {
      nearbyOffers: createMockOffers(3)
    },
    [DomainNameSpace.Comments]: {
      commentsList: createMockCommentsList(2),
      status: SendingStatus.Success
    }
  });

  const mockApp = (
    <Provider store={store}>
      <HistoryRouter history={mockHistory}>
        <App cities={DEFAULT_CITIES} />
      </HistoryRouter>
    </Provider>
  );

  it('should render "MainScreen" when user navigate to "/"', () => {
    mockHistory.push(AppRoute.Main);

    render(mockApp);

    const titleElement = screen.getByRole('heading', { name: 'Cities' });
    const subtitleElement = screen.getByText('Places');

    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
  });

  it('should render "RoomScreen" when user navigate to "/offer/:id"', () => {
    mockHistory.push(`${AppRoute.Room}/${id}`);

    React.useEffect = jest.fn();

    render(mockApp);

    const roomContainer = screen.getByTestId('room-container');
    const nearbyContainer = screen.getByTestId('room-nearby-container');

    expect(roomContainer).toBeInTheDocument();
    expect(nearbyContainer).toBeInTheDocument();
  });

  it('should render "FavoriteScreen" when user navigate to "/favorite"', () => {
    mockHistory.push(AppRoute.Favorites);

    React.useEffect = jest.fn();

    render(mockApp);

    const titleElement = screen.getByRole('heading', { name: 'Saved listing' });
    const favoritesContainer = screen.getByTestId('favorites-list');

    expect(titleElement).toBeInTheDocument();
    expect(favoritesContainer).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existing route', () => {
    mockHistory.push('/non-existing-route');

    render(mockApp);

    const errorNumberElement = screen.getByText('404');
    const errorTextElement = screen.getByText('Page not found');
    const linkElement = screen.getByText('Return to main page');

    expect(errorNumberElement).toBeInTheDocument();
    expect(errorTextElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });

});

describe('App Routing with no authorization user', () => {
  const mockHistory = createMemoryHistory();

  const mockStore = configureMockStore();

  const id = 1;

  const mockRoom = createMockOffer({ id });
  const mockCity = createMockCity({ name: 'Paris' });

  const store = mockStore({
    [DomainNameSpace.User]: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userName: 'Jack'
    },
    [DomainNameSpace.Offers]: {
      offers: createMockOffers(3, { city: mockCity }),
      status: LoadingStatus.Success
    },
    [DomainNameSpace.Room]: {
      room: mockRoom,
      status: LoadingStatus.Success
    },
    [DomainNameSpace.Favorites]: {
      favoriteOffers: createMockOffers(3, { isFavorite: true })
    },
    [DomainNameSpace.Location]: {
      currentLocation: mockCity.name
    },
    [DomainNameSpace.NearbyOffers]: {
      nearbyOffers: createMockOffers(3)
    },
    [DomainNameSpace.Comments]: {
      commentsList: createMockCommentsList(2),
      status: SendingStatus.Success
    }
  });

  const mockApp = (
    <Provider store={store}>
      <HistoryRouter history={mockHistory}>
        <App cities={DEFAULT_CITIES} />
      </HistoryRouter>
    </Provider>
  );

  it('should render "LoginScreen" when user navigate to "/login"', () => {
    mockHistory.push(AppRoute.Login);

    render(mockApp);

    const headerElement = screen.getByRole('heading', { name: 'Sign in' });
    const loginInputElement = screen.getByTestId('login');
    const passwordInputElement = screen.getByTestId('password');

    expect(headerElement).toBeInTheDocument();
    expect(loginInputElement).toBeInTheDocument();
    expect(passwordInputElement).toBeInTheDocument();
  });
});
