import { useEffect, useState } from 'react';
import { getData } from '../api/auth/user';

export const useUser = () => {
  //va a recibir un objeto de tipo User o de tipo null y se inicializa de tipo null
  const [userData, setUserData] = useState<User | null>(null);
  useEffect(() => {
    const idUser = localStorage.getItem('idUser');
    
    if (idUser) { 
      getData(idUser)
        .then(userData => setUserData(userData))
        .catch(error => console.error('Error al recuperar los datos del usuario:', error));
    } else {
      console.log("Vaya puta mierda")
    }
  }, []);

  return { userData };
};
