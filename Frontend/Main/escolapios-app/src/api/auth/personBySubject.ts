import axios from 'axios'
axios.defaults.withCredentials = true;

export const getUserSubject = async (id: string) => {
  const response = await axios.get(`http://localhost:8080/api/asignaturaPersona/asignaturaId/${id}`);
  return response.data
}

export const getUsers = async (id: string) => {
  const response = await axios.get(`http://localhost:8080/api/asignaturaPersona/asignaturaIdPersona/${id}`);
  return response.data
}

export const getAsignaturaPersona = async (asignaturaId: string, personaId: string) => {
  const response = await axios.get(`http://localhost:8080/api/asignaturaPersona`, {
    params: {
      asignaturaId: asignaturaId,
      personaId: personaId
    }
  });
  return response.data
}

export const updateAsignaturaPersona = async (updatedSubjectPerson: SubjectPerson, asignaturaId: string, personaId: string) => {
  const response = await axios.put(`http://localhost:8080/api/asignaturaPersona`, updatedSubjectPerson, {
    params: {
      asignaturaId: asignaturaId,
      personaId: personaId
    }
  });

  return response.data
}