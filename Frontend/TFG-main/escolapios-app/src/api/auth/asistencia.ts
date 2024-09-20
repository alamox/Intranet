import axios from 'axios'
axios.defaults.withCredentials = true;

const rutaApi = `http://localhost:8080/api`;

export const getFaltasPorAsignatura = async (asignaturaIdn: number, personaIdn: number) => {
    const asignaturaId = asignaturaIdn.toString();
    const personaId = personaIdn.toString();
    try {
        const response = await axios.get(`${rutaApi}/numAsistencias/asignaturaId/${asignaturaId}/personaId/${personaId}`);
        return response.data;
    } catch (error) {
        console.error('Error al recuperar los faltas asociadas:', error);
        throw error;
    }
};