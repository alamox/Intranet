
import './LoadingAnimation.css';
import loadingGif from '/src/assets/section-load-loading.gif'; 

const LoadingAnimation = () => {
  return (
    <div className='loading-container'>
      <div className='background'></div>
      <img className="loading-gif" src={loadingGif} alt="Loading..." />
    </div>
  );
};

export default LoadingAnimation;  