import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../const';
import './not-found-screen.css';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="page page--gray">
      <main className="page--main">
        <section className="not-found__message">
          <p className="not-found__text">404</p>
          <p className="not-found__text">Page not found</p>
          <NavLink
            className="not-found__return-link"
            to={AppRoute.Main}
          >Return to main page
          </NavLink>
        </section>
      </main>
    </div>
  );
}

export default NotFoundScreen;
