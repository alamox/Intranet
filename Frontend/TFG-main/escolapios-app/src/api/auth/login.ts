import axios from 'axios'
axios.defaults.withCredentials = true;

export const getLogin = async ({ username, password }: Login) => {
  const response = await axios.get('http://localhost:8080/api/login?usuario='+username+'&contraseña='+password)
  console.log({response});
  return response.data
}