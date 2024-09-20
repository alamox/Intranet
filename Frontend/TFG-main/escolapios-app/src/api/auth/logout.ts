import axios from 'axios'
axios.defaults.withCredentials = true;

export const getLogout = async () => {
  const response = await axios.post(`http://localhost:8080/api/logout`)
  console.log({response});
  return response.data
}