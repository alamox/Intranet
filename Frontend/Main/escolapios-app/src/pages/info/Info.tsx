import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Info.css"
//import Instalaciones from './instalaciones/Instalaciones';
import LoadingAnimation from '../../components/LoadingAnimation';


export const Info = () => {
  const navigate = useNavigate();

  const [loadingLogin, setLoadingLogin] = useState(false);

  const handleClickLogin = () => {
    setLoadingLogin(true);
    setTimeout(() => {
      navigate("/");
    }, 2000); 
  };


  return (
    <div className='info-page'>

      <div className='info-page'>
        {loadingLogin ? (
          <LoadingAnimation />
        ) : (
          <>

      <header className="info-page__header">
        <h1 id='fuenteGrande'>INFORMACIÓN DEL CENTRO</h1>
        <button className="info-form__login-button" type="button" onClick={handleClickLogin}>
          <span id='fuenteNormal'>Volver al inicio de sesión</span>
        </button>
         
      </header>
      <div className='info-page__content'>
        <div className='info-page__text-box1'>
          <h1>HISTORIA</h1>
          <p id='fuenteNormal' className='info-page__text1'>A finales de 1736,
           conocedores los getafenses del colegio para pobres de los Escolapios
            del barrio de Lavapiés de Madrid, invitaron a la Orden Escolapia
             a que hiciera una segunda fundación en esta localidad.
              El 30 de diciembre se firmaron los acuerdos.
               El día 1 de enero de 1737 llegaban los cuatro primeros religiosos
                Escolapios a Getafe y al día siguiente
          , 2 de enero, se iniciaron las clases. </p>
          <img className="info-page_mapa-getafe" src="/src/assets/getafe_1700.jpg" alt="mapa-getafe" />
        </div>

              <div className="info-page__container1">
                <div className='info-page__image-box1'>
                  <img className="" src="/src/assets/escolapios.png" alt="imagen-colegio"></img>
                </div>
                <div className='info-page__text-box2'>
                  <h2>Nuestras Instalaciones</h2>
                  <p id='fuenteNormal' className='info-page__text2'>
                    Pistas de pabellón: Espacios multifuncionales para la práctica de deportes y actividades físicas.<br />
                    Polideportivo: Un complejo deportivo equipado para albergar diferentes disciplinas y eventos escolares.<br />
                    Vestuarios: Áreas adecuadas para que los estudiantes se preparen para las actividades físicas.<br />
                    Sala Polivalente: Un espacio versátil utilizado para una variedad de eventos y funciones del colegio.<br />
                    Sala de Espejos: Utilizada para actividades como danza y gimnasia rítmica.<br />
                    Tatami: Un área específica para artes marciales y otras actividades similares.<br />
                    Campo de fútbol: Instalaciones al aire libre para la práctica del fútbol y otros deportes de campo.<br />
                    Rocódromo: Una estructura especializada para la escalada, fomentando la actividad física y la superación personal.<br />
                  </p>
                </div>
              </div>
            </div>
            <div className="info-page__image-container2">
              <div className='info-page__image-box2'>
                <img className="" src="/src/assets/2Polideportivo.jpg" alt="imagen-colegio2"></img>
              </div>
              <div className='info-page__image-box2'>
                <img className="" src="/src/assets/campo_futbol.jpg" alt="imagen-colegio3"></img>
              </div>
              <div className='info-page__image-box2'>
                <img className="" src="/src/assets/Tatami.jpg" alt="imagen-colegio4"></img>
              </div>
            </div>

            
            <div className='background'></div>
          </>
        )}
      </div>
    </div>
  );
};


