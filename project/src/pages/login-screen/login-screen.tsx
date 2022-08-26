import Header from '../../components/header/header';
import { FormEvent, useRef } from 'react';
import { AuthData } from '../../types/auth-data';
import { useAppDispatch } from '../../hooks/store';
import { loginAction } from '../../store/user-process/async-actions';
import { Cities } from '../../types/city';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { changeLocation } from '../../store/location-process/location-process';
import { toast } from 'react-toastify';

type LoginScreenProps = {
  cities: Cities;
};

const getRandomCity = ( cities: Cities ) => {
  const randomIndex = Math.floor(Math.random() * cities.length);
  return cities[randomIndex];
};

const validatePassword = ( password: string ): boolean =>
  (/[a-zA-Z]+[1-90]+|[1-90]+[a-zA-Z]+/).test(password);


function LoginScreen( { cities }: LoginScreenProps ): JSX.Element {

  const dispatch = useAppDispatch();

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const randomCity = getRandomCity(cities);

  const handleSubmit = ( evt: FormEvent<HTMLFormElement> ): void => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {

      if (validatePassword(passwordRef.current.value)) {
        const authData: AuthData = {
          login: loginRef.current.value,
          password: passwordRef.current.value
        };
        dispatch(loginAction(authData));
      } else {
        toast.warning('Incorrect password');
      }
    }
  };

  const handleLocationLinkClick = () => {
    dispatch(changeLocation(randomCity));
  };

  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  data-testid="login"
                  ref={loginRef}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  data-testid="password"
                  ref={passwordRef}
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                to={AppRoute.Main}
                className="locations__item-link"
                onClick={handleLocationLinkClick}
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
