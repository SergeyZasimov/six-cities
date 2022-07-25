import Header from '../../components/header/header';
import './not-found-screen.css';

function NotFoundScreen() {
  return (
    <div className="page page--gray">
      <Header />
      <main className="page--main">
        <section className="not-found__message">
          <p className="not-found__text">404</p>
          <p className="not-found__text">Page not found</p>
          <a
            className="not-found__return-link"
            href="/"
          >Return to main page
          </a>
        </section>
      </main>
    </div>
  );
}

export default NotFoundScreen;
