import axios from 'axios'
axios.defaults.withCredentials = true;

export const getData = async ( id: string ) => {
  const response = await axios.get(`http://localhost:8080/api/persona/${id}`)
  return response.data
}

export const getAllStudents= async () => {
    const response = await axios.get(`http://localhost:8080/api/personas/alumnos`);
    return response.data
}