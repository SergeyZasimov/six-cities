import { render, screen } from '@testing-library/react';
import CommentForm from './comment-form';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { SendingStatus } from '../../const';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const store = mockStore({
  Comments: {
    status: SendingStatus.Idle
  }
});

describe('Comment Form: Render', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <CommentForm roomId={1} />
      </Provider>
    );

    expect(screen.getAllByTestId(/rating-star/i).length).toBe(5);
    expect(screen.getByTestId('comment-text')).toBeInTheDocument();
    expect(screen.getByTestId('comment-submit-button')).not.toBeEnabled();
  });

  it('should switch button to enable', async () => {
    render(
      <Provider store={store}>
        <CommentForm roomId={1} />
      </Provider>
    );

    const thirdRatingStar = screen.getByTestId('rating-star-3');
    const commentTextArea = screen.getByTestId('comment-text');

    await userEvent.click(thirdRatingStar);
    await userEvent.type(commentTextArea, 'q'.repeat(50));

    expect(screen.getByTestId('comment-submit-button')).toBeEnabled();
  });

  it('should button stay disable when comment text length less than 50', async () => {
    render(
      <Provider store={store}>
        <CommentForm roomId={1} />
      </Provider>
    );

    const thirdRatingStar = screen.getByTestId('rating-star-3');
    const commentTextArea = screen.getByTestId('comment-text');

    await userEvent.click(thirdRatingStar);
    await userEvent.type(commentTextArea, 'q'.repeat(49));

    expect(screen.getByTestId('comment-submit-button')).toBeDisabled();
  });

});
