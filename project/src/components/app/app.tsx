import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import PrivateRoute from '../private-route/private-route';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import RoomScreen from '../../pages/room-screen/room-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import withMap from '../../hocs/with-map';
import { useAppSelector } from '../../hooks/store';
import HistoryRouter from '../history-router/history-router';
import { browserHistory } from '../../browser-history';
import { Cities } from '../../types/city';
import { getAuthorizationStatus } from '../../store/selectors';
import { checkAuthStatus } from '../utils';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import RestrictRoute from '../restrict-route/restrict-route';

type AppProps = {
  cities: Cities;
};

const MainScreenWithMap = withMap(MainScreen);
const RoomScreenWithMap = withMap(RoomScreen);

function App({ cities }: AppProps): JSX.Element {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (checkAuthStatus(authorizationStatus)) {
    return <LoadingScreen />;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainScreenWithMap
              cities={cities}
            />
          }
        />
        <Route
          path={AppRoute.Login}
          element={
            <RestrictRoute authStatus={authorizationStatus}>
              <LoginScreen />
            </RestrictRoute>
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authStatus={authorizationStatus}>
              <FavoritesScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Room}/:id`}
          element={<RoomScreenWithMap />}
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFoundScreen />}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
