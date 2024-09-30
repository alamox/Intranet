import { useNavigate } from 'react-router-dom';
import './Alumni.css';

const Alumni = () => {
  const navigate = useNavigate();

  const handleBackToInfo = () => {
    navigate('/info'); 
  };

  return (
    <div className='alumni-container'>
      <button className="info-form__button" onClick={handleBackToInfo}>
        Volver a Información
      </button> {}
      <h1>Alumni</h1>
      <p>Texto sobre si eres antiguo alumno y que tipo de actividades se puede hacer siendolo</p>
      {}
    </div>
  );
}

export default Alumni;
