import { Link, useLocation } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { logoutAction } from '../../store/api-actions';
import { SyntheticEvent } from 'react';


function Header(): JSX.Element {

  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { authorizationStatus, userName } = useAppSelector((state) => state);
  const isLogoLinkActive = pathname === AppRoute.Main;
  const isSignInNotAvailable = pathname === AppRoute.Login;

  const handleLogOutClick = (evt: SyntheticEvent): void => {
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
            (() => {
              if (isSignInNotAvailable) {
                return '';
              }
              if (authorizationStatus === AuthorizationStatus.Auth) {
                return (
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
                          <span className="header__favorite-count">3</span>
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
                  </nav>
                );
              } else {
                return (
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
                  </nav>
                );
              }
            })()
          }
        </div>
      </div>
    </header>
  );
}

export default Header;
