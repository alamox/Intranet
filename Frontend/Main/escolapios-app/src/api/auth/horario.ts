import axios from 'axios'
axios.defaults.withCredentials = true;

const rutaApi = `http://localhost:8080/api`;

export const getHorarioByCursoGrado = async (gradoIdn: number, cursoIdn: number) => {
    const gradoId = gradoIdn.toString();
    const cursoId = cursoIdn.toString();
    try {
        const response = await axios.get(`${rutaApi}/horario/gradoId/${gradoId}/cursoId/${cursoId}`);
        return response.data;
    } catch (error) {
        console.error('Error al recuperar el horario asociado: ', error);
        throw error;
    }
};