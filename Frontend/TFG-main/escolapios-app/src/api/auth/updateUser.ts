import axios from 'axios';
axios.defaults.withCredentials = true;

export const updateUser = async (persona : User) => {
  console.log({persona});
  const idString = persona.id.toString();
  try {
    const response = await axios.put(`http://localhost:8080/api/persona/${idString}`, persona);
    console.log('Respuesta actualizar: ', response);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la contraseña:', error);
    throw error;
  }
};