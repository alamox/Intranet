import axios from 'axios'
import { getData } from './user';
axios.defaults.withCredentials = true;

const rutaApi = `http://localhost:8080/api`;

export const getArchivosPorIdEntrega = async (idArchivo: string) => {
    try {
        const response = await axios.get(`${rutaApi}/archivoPersona/archivoId/${idArchivo}`);
        return response.data;
    } catch (error) {
        console.error('Error al recuperar los archivos asociados:', error);
        throw error;
    }
};

export const getArchivosPorIdEntregaIdPersona = async (idArchivo: string, idPersona: string) => {
    try {
        const response = await axios.get(`${rutaApi}/archivoPersona`, {
            params: {
                archivoId: idArchivo,
                personaId: idPersona
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al recuperar los archivos asociados:', error);
        throw error;
    }
};

export const updateArchivoPersona = async (archPersNuevo: ArchivoPersona, archivoId: string, personaId: string) => {
    const userData: User = await getData(personaId);
    /*const archivo: Archivo = {
        datos: archPersNuevo.datos,
        nombre: `${userData?.nombre}_${userData?.apellido1}`
    };*/
    try {
        console.log({archPersNuevo}, {archivoId}, {personaId});
        const response = await axios.put(`${rutaApi}/archivoPersona`, archPersNuevo, {
            params: {
                archivoId: archivoId,
                personaId: personaId
            }
        });
        console.log({response})
        return response.data;

    } catch (error) {
        console.error('Error al actualizar archivo persona:', error);
        throw error;
    }
};