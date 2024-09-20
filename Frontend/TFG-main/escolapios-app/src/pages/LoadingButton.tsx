import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [loadingContact, setLoadingContact] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const navigate = useNavigate();

  const navigateToContact = () => {
    setLoadingContact(true);
    setTimeout(() => {
      setLoadingContact(false);
      navigate('/contact');
    }, 2000);
  };

  const navigateToInfo = () => {
    setLoadingInfo(true);
    setTimeout(() => {
      setLoadingInfo(false);
      navigate('/info');
    }, 2000);
  };

  return (
    <div>
      {loadingContact ? (
        <div>Cargando...</div>
      ) : (
        <button onClick={navigateToContact}>Go to Contact</button>
      )}
      {loadingInfo ? (
        <div>Cargando...</div>
      ) : (
        <button onClick={navigateToInfo}>Go to Info</button>
      )}
    </div>
  );
}

export default Login;