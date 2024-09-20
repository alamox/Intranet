import { useState } from 'react'; // <-- Añade este import
import { useForm } from "react-hook-form"
import "./Login.css"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLogin } from "../../hooks/useLogin";
import LoadingAnimation from '../../components/LoadingAnimation'
import { ThemeContext } from '../../components/ThemeContext'
import { useContext } from 'react';

interface Login {
  username: string;
  password: string;
}

export const Login = () => {
  const { register, handleSubmit, formState: { errors, submitCount }, } = useForm<Login>();
  const { login, loginStatus, onLoginError } = useLogin();
  const navigate = useNavigate();
  const [loadingContact, setLoadingContact] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleClickContact = () => {
    setLoadingContact(true);
    setTimeout(() => {
      setLoadingContact(false);
      navigate("/contact");
    }, 1000);
  }
  const handleClickInfo = () => {
    setLoadingInfo(true);
    setTimeout(() => {
      setLoadingInfo(false);
      navigate("/info");
    }, 1000);
  }

  const handleLogin = (data: Login) => {
      login(data);
  }
// Cambia el color de fondo del documento dependiendo del estado de darkMode
useEffect(() => {
  if (darkMode) {
    document.documentElement.style.setProperty('--color-background', 'var(--color-background-dark)');
  } else {
    document.documentElement.style.setProperty('--color-background', 'var(--color-background-light)');
  }
}, [darkMode]);
  useEffect(() => {
    if (loginStatus.isSuccess) {
      navigate("/home")
      window.location.reload();
    }
  }, [loginStatus])

  useEffect(() => {
    if (errors.username || errors.password) {
      onLoginError('Por favor, introduce tus datos')
    }
  }, [submitCount])

  return (
    <div className='login-page'>
      {loadingContact || loadingInfo || loadingLogin ? (
        <LoadingAnimation />
      ) : (
        <>
          <div className='login-page__left-panel'>
            <div className="login-page__top-panel">
              <h1 id='fuenteGrande'>Bienvenida al campus virtual</h1>
            </div>
            <div className='left-panel__background'></div>
            <div className='left-panel__box-info'>
              <h1 id='fuenteGrande'>Colegio Escolapios de Getafe</h1>
            </div>
          </div>
          <div className='login-page__buttons-top'>
            <div className="login-form_space-top"></div>
            <button className="login-form__login-button" type="submit" onClick={handleClickContact}>
              <svg className="phone"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="30"
                height="30"
              >
                <image href="/src/assets/phone.png" width="20" height="20" />
              </svg>
              <span id='fuenteNormal'>Contacto</span>
            </button>
            <button className="login-form__login-button" type="submit" onClick={handleClickInfo}>
              <svg className="info"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="30"
                height="30"
              >
                <image href="/src/assets/info.png" width="20" height="20" />
              </svg>
              <span id='fuenteNormal'>Información</span>
            </button>
          </div>
          <form className="login-page__login-form" onSubmit={handleSubmit(handleLogin)}>
            <div className="login-form__input">
              <label htmlFor="username" id='fuenteNormal'>Usuario</label>
              <input id="username" type="text" placeholder="Nombre de Usuario" {...register("username", { required: true })}></input>
            </div>
            <div className="login-form__input">
              <label htmlFor="password" id='fuenteNormal'>Contraseña</label>
              <input id="password" type="password" placeholder="Contraseña" {...register("password", { required: true })}></input>
            </div>
            <span className="login-form__auth-error" id="fuenteInfo">{loginStatus.message}</span>
            <button className="login-form__login-button" type="submit">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"           >
                <path d="M22,15.04C22,17.23 20.24,19 18.07,19H5.93C3.76,19 2,17.23 2,15.04C2,13.07 3.43,11.44 5.31,11.14C5.28,11 5.27,10.86 5.27,10.71C5.27,9.33 6.38,8.2 7.76,8.2C8.37,8.2 8.94,8.43 9.37,8.8C10.14,7.05 11.13,5.44 13.91,5.44C17.28,5.44 18.87,8.06 18.87,10.83C18.87,10.94 18.87,11.06 18.86,11.17C20.65,11.54 22,13.13 22,15.04Z"             >
                </path>
              </svg>
              <span id='fuenteNormal'>Acceder</span>
              </button>          
          </form>
        </>
      )}
    </div>
  )
}