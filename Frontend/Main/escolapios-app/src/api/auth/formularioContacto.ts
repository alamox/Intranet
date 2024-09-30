import axios from "axios";

const rutaApi = `http://localhost:8080/api`
export const sendFormulario = async (formulario: Formulario) => {
    const response = await axios.post(`${rutaApi}/contacto`, formulario);
    return response.data;
}

export const getAllFormularios = async () => {
    const response = await axios.get(`${rutaApi}/contactos`);
    return response.data;
}

export const updateContacto = async (id: string, formulario: Formulario) => {
    const response = await axios.put(`${rutaApi}/contacto/${id}`, formulario);
    return response.data;
}


