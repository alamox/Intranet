import { useCallback } from 'react'
import { useStatus } from './useStatus'
import { getLogin } from '../api/auth/login'
import { AxiosError, HttpStatusCode } from 'axios'
import useSession from './useSession'

export const useLogin = () => {
  const { apiState, onLoading, onSuccess, onError } = useStatus();
  const [, setIsLogged] = useSession();

  const login = useCallback(async (loginData: Login) => {
    onLoading()
    try {
      const user: User = await getLogin(loginData)
      
      if(user != null ){
        const idString = user.id.toString();
        localStorage.setItem('idUser', idString); 
        onSuccess();
        console.log({user})
        console.log({idString})
        setIsLogged(true);
      } else {
        onError('Usuario o contraseña incorrecta')
      }
      
    } catch (e){
      const error = e as AxiosError;
      const status = error.response?.status
      if (status == HttpStatusCode.Unauthorized) {
        onError('Usuario o contraseña incorrecta')
      } else {
        onError('Servicio no disponible. Consultar con el equipo de back.')
      }
    }
  }, [setIsLogged, onLoading, onSuccess, onError]);

  return { loginStatus: apiState, login, onLoginError: onError }
}
