import React, { useEffect, useState } from 'react';
import './Horario.css';
import { getHorarioByCursoGrado } from '../../api/auth/horario';

const Horario: React.FC<{ gradoId: number; cursoId: number }> = ({ gradoId, cursoId }) => {
    const [horario, setHorario] = useState<Horario[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchHorario = async () => {
            try {
                const data = await getHorarioByCursoGrado(gradoId, cursoId);
                setHorario(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchHorario();
    }, [gradoId, cursoId]);

    const diasSemana = Array.from(new Set(horario.map(clase => clase.dia)));
    const horas = Array.from(new Set(horario.map(clase => clase.hora)));

    const getSiglas = (nombreAsignatura: string) => {
        switch (nombreAsignatura) {
            case 'Acceso a datos':
                return 'AD';
            case 'Inglés técnico para grado superior DAM':
                return 'IT';
            case 'Desarrollo de interfaces':
                return 'DI';
            case 'Empresa e iniciativa emprendedora DAM':
                return 'EIE';
            case 'Sistemas de gestión empresarial':
                return 'SGE';
            case 'Programación de servicios y procesos':
                return 'PSP';
            case 'Programación multimedia y dispositivos móviles':
                return 'PMDM';
            // Añadir más casos según sea necesario
            default:
                return nombreAsignatura;
        }
    };

    if (loading) {
        return <p>Cargando horario...</p>;
    }

    return (
        <div className="horarioContainer">
            <table className="horarioTabla">
                <thead>
                    <tr>
                        <th className="empty-cell"></th>
                        {diasSemana.map(day => (
                            <th key={day} className="day_title">{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {horas.map(hora => (
                        <tr key={hora}>
                            <td className="hour">{hora}</td>
                            {diasSemana.map(day => {
                                const clase = horario.find(clase => clase.hora === hora && clase.dia === day);
                                return (
                                    <td key={`${day}-${hora}`} className={`class ${clase ? '' : 'empty'}`} data-tooltip={clase?.nombreAsignatura}>
                                        {clase ? clase.nombreAsignatura : ''}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Horario;
