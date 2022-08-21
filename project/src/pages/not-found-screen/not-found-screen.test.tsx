import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { render, screen } from '@testing-library/react';
import NotFoundScreen from './not-found-screen';

describe('NotFoundScreen: Render', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <NotFoundScreen />
      </HistoryRouter>
    );

    const errorNumberElement = screen.getByText('404');
    const errorTextElement = screen.getByText('Page not found');
    const linkElement = screen.getByText('Return to main page');

    expect(errorNumberElement).toBeInTheDocument();
    expect(errorTextElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
