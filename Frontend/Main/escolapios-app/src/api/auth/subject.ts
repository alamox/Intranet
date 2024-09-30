import axios from 'axios'
axios.defaults.withCredentials = true;

export const getSubjects = async (id: string) => {
  const response = await axios.get(`http://localhost:8080/api/asignaturaPersona/personaId/${id}`);
  return response.data
}

export const getSubjectName = async (id: string) => {
  const response = await axios.get(`http://localhost:8080/api/asignaturaPersona/personaIdAsign/${id}`);
  return response.data
}

export const getSubject = async (id: string) => {
  console.log({id})
  const response = await axios.get(`http://localhost:8080/api/asignatura/${id}`);
  console.log({response})
  return response.data
}