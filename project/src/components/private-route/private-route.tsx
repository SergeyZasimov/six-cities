import { AppRoute, AuthorizationStatus } from '../../const';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  authStatus: AuthorizationStatus,
  children: JSX.Element
}


function PrivateRoute( props: PrivateRouteProps ): JSX.Element {
  const { authStatus, children } = props;

  return (
    authStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
