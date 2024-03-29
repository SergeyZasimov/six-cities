import { Link, useLocation } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { memo, SyntheticEvent } from 'react';
import { getFavoriteOffers } from '../../store/favotires-process/selectors';
import { logoutAction } from '../../store/user-process/async-actions';
import { getAuthorizationStatus, getUserName } from '../../store/user-process/selectors';


function Header(): JSX.Element {

  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userName = useAppSelector(getUserName);
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  const isLogoLinkActive = pathname === AppRoute.Main;
  const isSignInAvailable = pathname !== AppRoute.Login;

  const handleLogOutClick = ( evt: SyntheticEvent ): void => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              to={AppRoute.Main}
              className={`header__logo-link ${isLogoLinkActive && 'header__logo-link--active'} `}
            >
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          {
            isSignInAvailable &&
            (authorizationStatus === AuthorizationStatus.Auth ?
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.Favorites}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">{userName}</span>
                      <span className="header__favorite-count">{favoriteOffers.length}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link
                      className="header__nav-link"
                      to={AppRoute.Main}
                      onClick={handleLogOutClick}
                    >
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </ul>
              </nav> :
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.Login}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                </ul>
              </nav>)
          }
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
