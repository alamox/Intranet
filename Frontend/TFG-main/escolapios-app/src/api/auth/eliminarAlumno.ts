import axios from 'axios'
axios.defaults.withCredentials = true;

export const eliminarAlumno = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/persona/${id}`);
      console.log('Respuesta:', response);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar alumno:', error);
      throw error;
  }
};