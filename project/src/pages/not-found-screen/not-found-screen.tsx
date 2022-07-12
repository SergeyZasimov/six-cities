import './not-found-screen.css';

function NotFoundScreen() {
  return (
    <div className="page page--gray">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a
                className="header__logo-link header__logo-link--active"
                href="/"
              >
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
          </div>
        </div>
      </header>
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
