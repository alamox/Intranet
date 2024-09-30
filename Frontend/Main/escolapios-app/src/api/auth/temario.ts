import axios from 'axios'
axios.defaults.withCredentials = true;

const rutaApi = `http://localhost:8080/api`;

export const getArchivos = async (idAsignatura: string, idTrimestre: string) => {
    try {
        const response = await axios.get(`${rutaApi}/archivos/asignaturaId/trimestreId`, {
            params: { asignaturaId: idAsignatura, trimestreId: idTrimestre }
        });
        return response.data;
    } catch (error) {
        console.error('Error al recuperar los archivos:', error);
        throw error;
    }
};

export const getArchivo = async (idArchivo: string) => {
    try {
        const response = await axios.get(`${rutaApi}/archivo/${idArchivo}`);
        return response.data;
    } catch (error) {
        console.error('Error al recuperar los archivos:', error);
        throw error;
    }
};

export const createArchivo = async (archivo: Archivo, idAsignatura: string, idTrimestre: string) => {
    try {
        const response = await axios.post(`${rutaApi}/archivo`, archivo, {
            params: { asignaturaId: idAsignatura, trimestreId: idTrimestre }
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear el archivo:', error);
        throw error;
    }
};

export const updateArchivo = async (id: string, archivo: Archivo) => {
    try {
        const response = await axios.put(`${rutaApi}/archivo/${id}`, archivo);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el archivo:', error);
        throw error;
    }
};

export const deleteArchivo = async (id: string) => {
    try {
        const response = await axios.delete(`${rutaApi}/archivo/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el archivo:', error);
        throw error;
    }
};

export const deleteAllArchivos = async () => {
    try {
        const response = await axios.delete(`${rutaApi}/archivos`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar todos los archivos:', error);
        throw error;
    }
};