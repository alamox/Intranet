import { useNavigate } from 'react-router-dom';
import './Instalaciones.css';

const Instalaciones = () => {
  const navigate = useNavigate();

  const handleBackToInfo = () => {
    navigate('/info'); 
  };

  return (
    <div className='instalaciones-container'>
      <button className="info-form__button" onClick={handleBackToInfo}>
        Volver a Información
      </button> {}
      <h1>Nuestras Instalaciones</h1>
      <p>Aqui va tecto acerca de nuestras instalaciones y cuando se construyó el edirficio principal</p>
      {}
    </div>
  );
}

export default Instalaciones;
