import axios from "axios";
axios.defaults.withCredentials = true;

export const parserGrado= async (id: string) => {
    const response = await axios.get(`http://localhost:8080/api/grados/${id}`);
    return response.data
}

export const parserCurso= async (id: string) => {

    const response = await axios.get(`http://localhost:8080/api/cursos/${id}`);
    return response.data
}