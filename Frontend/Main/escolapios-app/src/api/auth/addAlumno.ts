import axios from 'axios'
axios.defaults.withCredentials = true;

export const addAlumno = async (persona: UserSinID, gradoId: number | undefined, cursoId: number | undefined) => {
  console.log({persona});
  console.log({gradoId});
  console.log({cursoId})
    try {
      console.log({persona});
      const response = await axios.post(`http://localhost:8080/api/persona`, persona, {
        params: { gradoId, cursoId }
      });
      console.log('Respuesta:', response);
      return response.data;
    } catch (error) {
      console.error('Error al añadir alumno:', error);
      throw error;
  }
};