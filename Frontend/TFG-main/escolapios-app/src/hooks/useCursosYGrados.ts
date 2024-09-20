import { useEffect, useState } from 'react';
import axios from 'axios';

export const useCursos = () => {
    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/cursos');
                setCursos(response.data);
            } catch (error) {
                console.error('Error al obtener los cursos:', error);
                // Puedes manejar el error aquí, por ejemplo, estableciendo cursos en un valor predeterminado
                setCursos([]);
            }
        };

        fetchCursos();
    }, []);

    return cursos;
};

export const useGrados = () => {
    const [grados, setGrados] = useState([]);

    useEffect(() => {
        const fetchGrados = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/grados');
                setGrados(response.data);
            } catch (error) {
                console.error('Error al obtener los grados:', error);
                // Puedes manejar el error aquí, por ejemplo, estableciendo grados en un valor predeterminado
                setGrados([]);
            }
        };

        fetchGrados();
    }, []);

    return grados;
};
