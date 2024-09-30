import { useNavigate } from 'react-router-dom';
import './Docentes.css';

const Docentes = () => {
  const navigate = useNavigate();

  const handleBackToInfo = () => {
    navigate('/info'); 
  };

  return (
    <div className='docentes-container'> {}
      <button className="info-form__button" onClick={handleBackToInfo}>
        Volver a Información
      </button> {}
      <h1>Docentes Cualificados</h1> {}
      <p>Texto acerca de la preparacion de nuestros porfesores en el entorno de la educación</p>
      {}
    </div>
  );
}

export default Docentes;
