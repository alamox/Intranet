import axios from "axios";
import { useState } from "react";

const useEnviarFaltas = () => {
    const [loading, setLoading] = useState(false);
    const [error1, setError] = useState(null);

    const enviarFaltas = async (faltas: FaltaAsistencia[]) => {
        setLoading(true);
        setError(null);
        const now = new Date();
        const fecha = now.toISOString().split('T')[0];
        const hora = now.toTimeString().split(' ')[0]; 

        try {
            const promises = faltas.map(async (falta: FaltaAsistencia) => {
                const asistencia: Asistencia = {
                    id: falta.id,
                    justificada: falta.faltaJustificada,
                    fecha: fecha,
                    hora: hora
                };

                console.log({asistencia});

                const response = await axios.post(
                    `http://localhost:8080/api/asistencia?asignaturaId=${falta.idAsignatura}&personaId=${falta.id}`,
                    asistencia
                );

                if (response.status !== 201) {
                    throw new Error('Failed to create Asistencia');
                }
            });

            await Promise.all(promises);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    return { enviarFaltas, loading, error1 };
};

export default useEnviarFaltas;
