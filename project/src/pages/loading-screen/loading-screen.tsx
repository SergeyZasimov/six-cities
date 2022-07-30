import './loading-screen.css';

function LoadingScreen(): JSX.Element {
  return (
    <div className='lds-container'>
      <div className="lds-hourglass"></div>
    </div>
  );
}

export default LoadingScreen;
