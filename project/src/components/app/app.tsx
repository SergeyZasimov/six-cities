import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import PrivateRoute from '../private-route/private-route';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import RoomScreen from '../../pages/room-screen/room-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { useAppSelector } from '../../hooks/store';
import { Cities } from '../../types/city';
import { checkAuthStatus } from '../utils';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import RestrictRoute from '../restrict-route/restrict-route';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type AppProps = {
  cities: Cities;
};

function App( { cities }: AppProps ): JSX.Element {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (checkAuthStatus(authorizationStatus)) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={
          <MainScreen
            cities={cities}
          />
        }
      />
      <Route
        path={AppRoute.Login}
        element={
          <RestrictRoute authStatus={authorizationStatus}>
            <LoginScreen cities={cities} />
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
        element={<RoomScreen />}
      />
      <Route
        path={AppRoute.NotFound}
        element={<NotFoundScreen />}
      />
    </Routes>
  );
}

export default App;
