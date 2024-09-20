import { useCallback } from 'react';
import { useStatus } from './useStatus';
import { updateUser } from '../api/auth/updateUser';
import { AxiosError } from 'axios';

export const usePassword = () => {
    const { apiState, onLoading, onSuccess, onError } = useStatus();

    const checkPassword = useCallback(async (userData: User) => {
        onLoading();
        try {
            const response = await updateUser(userData);
            console.log(response, ' Respuesta en el hook');
            onSuccess();
            return true;
        } catch (e) {
            const error = e as AxiosError;
            if (error.response?.status === 401) {
                onError('Contraseña incorrecta');
            } else {
                onError('Error en la conexión con el servidor');
            }
            return false;
        }
    }, [onError, onLoading, onSuccess]);

    return { passwordCheckStatus: apiState, checkPassword, onPasswordCheckError: onError };
};

