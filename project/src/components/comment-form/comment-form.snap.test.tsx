import { render } from '@testing-library/react';
import CommentForm from './comment-form';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { SendingStatus } from '../../const';


const mockStore = configureMockStore();


describe('CommentForm: Snapshot', () => {
  const store = mockStore({
    Comments: {
      status: SendingStatus.Idle
    }
  });

  it('should render correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <CommentForm roomId={1} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
