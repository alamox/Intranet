import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorComponent.css';
import LoadingAnimation from './LoadingAnimation';

const ErrorComponent = () => {
  const navigate = useNavigate();
  const [isLoading, setLoadingLogin] = useState(false);

  const handleClickLogin = () => {
    setLoadingLogin(true);
    setTimeout(() => {
      navigate("/");
      setLoadingLogin(false);
    }, 2000); 
  };

  return (
    <div>
      {isLoading && <LoadingAnimation />}
      <div className="error-container">
        <img className="error-image" src="/src/assets/not_found3.png" alt="imagen_error" />
        <h1>ERROR 404</h1>
        <button className="info-form__login-button" type="button" onClick={handleClickLogin}>
          <span id='fuenteNormal'>Volver al inicio de sesión</span>
        </button>
      </div>
    </div>
  );
};

export default ErrorComponent;