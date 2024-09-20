import { ChangeEvent, useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import Swal from 'sweetalert2';
import "./Home.css"
import { useNavigate } from "react-router-dom";
import { usePassword } from "../../hooks/usePassword";
import { useForm } from "react-hook-form";
import Sidebar from "../../utils/Sidebar";
import { getSubjectName, getSubjects } from "../../api/auth/subject";
import { addAlumno } from "../../api/auth/addAlumno";
import { useCursos, useGrados } from "../../hooks/useCursosYGrados";
import FormularioAlumno from "../../utils/FormularioAlumno";
import FormularioProfesor from "../../utils/FormularioProfesor";
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importa los iconos
import { getAllStudents, getData } from "../../api/auth/user";
import { parserCurso, parserGrado } from "../../api/auth/parserGradoYCurso";
import LoadingAnimation from '../../components/LoadingAnimation';
import imageCompression from "browser-image-compression";
import FormularioEditarAlumno from "../../utils/FormularioEditarAlumno";
import { updateUser } from "../../api/auth/updateUser";
import { getLogout } from "../../api/auth/logout";
import { eliminarAlumno } from "../../api/auth/eliminarAlumno";
import withReactContent from "sweetalert2-react-content";
import useLogout from "../../hooks/useLogout";
import FormularioAddAlumno from "../../utils/FormularioAddAlumno";
import Horario from "../horario/Horario";
import { getAllFormularios, updateContacto } from "../../api/auth/formularioContacto";
import FormulariosContacto from "../../utils/FormulariosContacto";
import { getFaltasPorAsignatura } from "../../api/auth/asistencia";


export const Home = () => {
    const navigate = useNavigate();
    const { handleSubmit } = useForm<User>();
    const [contenidoActual, setContenidoActual] = useState('Asignaturas');
    const [activeTab, setActiveTab] = useState('Asignaturas');
    const [showSettingsOptions, setShowSettingsOptions] = useState(false);
    const [verPantalla, setPantallaDatos] = useState('home');
    const [barraVisible, setBarraVisible] = useState(false);
    const [error, setError] = useState('');
    const [contrasenaActual, setContrasenaActual] = useState('');
    const [contrasenaNueva, setContrasenaNueva] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [domicilio, setDomicilio] = useState('');
    const [telefono, setTelefono] = useState('');
    const [userSubjects, setUserSubjects] = useState<SubjectPerson[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    var { userData } = useUser();
    const [userState, setUserState] = useState<User | null>(userData);
    const { checkPassword } = usePassword();
    const [esProfesor, setEsProfesor] = useState(false);
    const cursos = useCursos();
    const grados = useGrados();
    const [foto, setFoto] = useState<string | ArrayBuffer | null>(null);
    const [alumnos, setAlumnos] = useState<any[]>([]);
    const [showMenu, setShowMenu] = useState(false);
    const [idAlumnoEditar, setIdAlumnoEditar] = useState('');
    const [idAlumnoEliminar, setIdAlumnoEliminar] = useState('');
    const [dataAlumnoEditar, setDataAlumnoEditar] = useState<User | null>();
    const [dataAlumnoEliminar, setDataAlumnoEliminar] = useState<User | null>();
    const defaultPhoto = "/src/assets/default-photo.jpg";
    const userPhoto = userData?.foto
        ? `data:image/png;base64,${userData.foto}`
        : defaultPhoto;
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const options = {
                maxSizeMB: 0.2,
                maxWidthOrHeight: 1280,
                useWebWorker: true,
            };

            try {
                const compressedFile = await imageCompression(file, options);
                const arrayBuffer = await compressedFile.arrayBuffer();
                const byteArray = new Uint8Array(arrayBuffer);
                const base64String = btoa(
                    byteArray.reduce((data, byte) => data + String.fromCharCode(byte), '')
                );

                setFoto(base64String);
            } catch (error) {
                console.error('Error al comprimir la imagen:', error);
            }
        }
    };

    function base64ToByteArray(base64: string): Uint8Array {
        const binaryString = atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    }

    const [formData, setFormData] = useState<Partial<User>>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (userData) {
            setUserState(userData);
            setFormData({
                nombre: userData.nombre,
                apellido1: userData.apellido1,
                apellido2: userData.apellido2,
                dni: userData.dni,
                telefono: userData.telefono,
                domicilio: userData.domicilio,
                correoElectronico: userData.correoElectronico,
                usuario: userData.usuario,
                contraseña: '',
                fechaNac: userData.fechaNac,
                esProfe: userData.esProfe,
                id: userData.id,
                foto: userData.foto
            });

            if (userData.id) {
                getSubjects(userData.id)
                    .then(subjectData => {
                        setUserSubjects(subjectData);
                        console.log({ subjectData });
                    })
                    .catch(error => console.error('Error al recuperar las asignaturas del usuario:', error));
                getSubjectName(userData.id)
                    .then(subjectData => {
                        setSubjects(subjectData);
                        console.log("Nombre asignaturas: ", { subjectData });
                    })
                    .catch(error => console.error('Error al recuperar las asignaturas:', error));

            }

            if (userData?.esProfe) {
                setEsProfesor(true);
                getAllStudents()
                    .then(async subjectData => {
                        try {
                            const nuevosAlumnos = await Promise.all(subjectData.map(async (user: User) => {
                                let curso;
                                let grado;

                                if (user.idCurso !== undefined && user.idGrado !== undefined) {
                                    curso = await parserCurso(user.idCurso!.toString());
                                    grado = await parserGrado(user.idGrado!.toString());
                                } else {
                                    curso = null;
                                    grado = null;
                                    console.log("Grado o curso undefined");
                                }

                                return {
                                    id: user.id,
                                    nombre: user.nombre,
                                    apellidos: `${user.apellido1} ${user.apellido2}`,
                                    cursoId: user.idCurso,
                                    gradoId: user.idGrado,
                                    dni: user.dni,
                                    esProfe: user.esProfe,
                                    foto: user.foto,
                                    curso,  // <-- agregar curso
                                    grado   // <-- agregar grado
                                };
                            }));

                            // Filtrar solo alumnos
                            const alumnos = nuevosAlumnos.filter((user: User) => !user.esProfe);
                            setAlumnos(alumnos);
                            console.log("Listado alumnos: ", alumnos);
                        } catch (error) {
                            console.error('Error al procesar los datos de los alumnos:', error);
                        }
                    })
                    .catch(error => console.error('Error al recuperar los alumnos:', error));
            }
        }

    }, [userData]);

    const handleFormulario = () => {
        if (!contrasenaActual || !contrasenaNueva || !confirmarContrasena) {
            setError('Por favor, rellena todos los campos');
            return;
        }

        if (contrasenaActual !== userState?.contraseña) {
            setError('La contraseña actual es incorrecta');
            return;
        }

        if (confirmarContrasena !== contrasenaNueva) {
            setError('¡Vaya! Las contraseñas nuevas no coinciden');
            return;
        }

        if (contrasenaActual === contrasenaNueva && contrasenaNueva === confirmarContrasena) {
            setError('¡Vaya! La nueva contraseña no puede ser igual que la nueva');
            return;
        }

        const updatedUserState = { ...userState, contraseña: contrasenaNueva };
        console.log({ updatedUserState });
        checkPassword(updatedUserState).then((success) => {
            if (success) {
                setUserState(updatedUserState);
                setError('¡Contraseña cambiada!');
                setContrasenaActual('');
                setContrasenaNueva('');
                setConfirmarContrasena('');
            } else {
                setError('Error al cambiar la contraseña');
            }
        });
    };

    const handleFormularioEditarAlumno = () => {
        updateUser(dataAlumnoEditar!);
        setError("Alumno editado con éxito")
        setTimeout(() => {
            getAllStudents()
                .then(async subjectData => {
                    try {
                        const nuevosAlumnos = await Promise.all(subjectData.map(async (user: User) => {
                            let curso;
                            let grado;

                            if (user.idCurso !== undefined && user.idGrado !== undefined) {
                                curso = await parserCurso(user.idCurso!.toString());
                                grado = await parserGrado(user.idGrado!.toString());
                            } else {
                                curso = null;
                                grado = null;
                                console.log("Grado o curso undefined");
                            }

                            return {
                                id: user.id,
                                nombre: user.nombre,
                                apellidos: `${user.apellido1} ${user.apellido2}`,
                                cursoId: user.idCurso,
                                gradoId: user.idGrado,
                                dni: user.dni,
                                esProfe: user.esProfe,
                                foto: user.foto,
                                curso,
                                grado
                            };
                        }));

                        // Filtrar solo alumnos
                        const alumnos = nuevosAlumnos.filter((user: User) => !user.esProfe);
                        setAlumnos(alumnos);
                        console.log("Listado alumnos: ", alumnos);
                    } catch (error) {
                        console.error('Error al procesar los datos de los alumnos:', error);
                    }
                })
                .catch(error => console.error('Error al recuperar los alumnos:', error));
            setPantallaDatos('deleteAlumno');
            setError('');
        }, 1200);

    }

    const handleFormularioAddAlumno = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        let fotoArray: number[] | undefined;

        if (typeof foto === 'string') {
            console.log("encuentra la foto");
            console.log({ foto });
            const byteArray = base64ToByteArray(foto);
            fotoArray = Array.from(byteArray);
            console.log({ fotoArray })
        }
        console.log({ fotoArray })

        const alumno: UserSinID = {
            nombre: formData.get('nombre') as string,
            apellido1: formData.get('apellido1') as string,
            apellido2: formData.get('apellido2') as string,
            dni: formData.get('dni') as string,
            correoElectronico: formData.get('correoElectronico') as string,
            fechaNac: new Date(formData.get('fechaNac') as string),
            domicilio: formData.get('direccion') as string,
            usuario: formData.get('usuario') as string,
            contraseña: formData.get('contrasenaActual') as string,
            esProfe: false,
            telefono: formData.get('telefono') as string,
            cursoId: Number(formData.get('cursoId')),
            gradoId: Number(formData.get('gradoId')),
            foto: fotoArray
        };

        console.log({ alumno })

        try {
            const response = await addAlumno(alumno, alumno.gradoId, alumno.cursoId);
            console.log('Alumno añadido:', response);
            setError('¡Nuevo alumno en el centro!');
            setTimeout(() => {
                window.location.reload();
            }, 1200);
        } catch (error) {
            console.error('Error al añadir alumno:', error);
        }
    };

    const handleEditAlumno = async (id: number) => {
        console.log(`Edit alumno con ID: ${id}`);
        setPantallaDatos('editarAlumno');
        const idAlumno = id.toString();
        setIdAlumnoEditar(idAlumno);
        const alumnoEditar: User = await getData(idAlumno);
        setDataAlumnoEditar(alumnoEditar);
        console.log({ alumnoEditar })
    };

    //ventana personalizada
    const MySwal = withReactContent(Swal);

    const handleDeleteAlumno = async (id: number) => {
        console.log(`Delete alumno con ID: ${id}`);
        const idAlumno = id.toString();
        setIdAlumnoEliminar(idAlumno);
        const alumnoEliminar: User = await getData(idAlumno);
        setDataAlumnoEliminar(alumnoEliminar);
        console.log({ alumnoEliminar });

        MySwal.fire({
            title: '¿Estás seguro?',
            text: `¿Estás seguro de que quieres eliminar a ${alumnoEliminar.nombre}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'No, cancelar',
        }).then((result: { isConfirmed: any; }) => {
            if (result.isConfirmed) {
                eliminarAlumno(idAlumno)
                    .then(() => {
                        setTimeout(() => {
                            getAllStudents()
                                .then(async subjectData => {
                                    try {
                                        const nuevosAlumnos = await Promise.all(subjectData.map(async (user: User) => {
                                            let curso;
                                            let grado;

                                            if (user.idCurso !== undefined && user.idGrado !== undefined) {
                                                curso = await parserCurso(user.idCurso!.toString());
                                                grado = await parserGrado(user.idGrado!.toString());
                                            } else {
                                                curso = null;
                                                grado = null;
                                                console.log("Grado o curso undefined");
                                            }

                                            return {
                                                id: user.id,
                                                nombre: user.nombre,
                                                apellidos: `${user.apellido1} ${user.apellido2}`,
                                                cursoId: user.idCurso,
                                                gradoId: user.idGrado,
                                                dni: user.dni,
                                                esProfe: user.esProfe,
                                                foto: user.foto,
                                                curso,
                                                grado
                                            };
                                        }));

                                        // Filtrar solo alumnos
                                        const alumnos = nuevosAlumnos.filter((user: User) => !user.esProfe);
                                        setAlumnos(alumnos);
                                        console.log("Listado alumnos: ", alumnos);
                                    } catch (error) {
                                        console.error('Error al procesar los datos de los alumnos:', error);
                                    }
                                })
                                .catch(error => console.error('Error al recuperar los alumnos:', error));
                            setPantallaDatos('deleteAlumno');
                            setError('');
                        }, 1200);
                        console.log(`Alumno con ID ${id} eliminado correctamente`);
                    })
                    .catch((error) => {
                        console.error('Error al eliminar alumno:', error);
                    });
            } else {
                console.log('Eliminación cancelada');
            }
        });
    };

    const handleFormularioProfe = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!contrasenaActual) {
            setError('Por favor, rellena el campo de tu contraseña para confirmar los cambios');
            return;
        }

        if (contrasenaActual !== userState?.contraseña) {
            setError('La contraseña actual es incorrecta');
            return;
        }

        if (contrasenaNueva || confirmarContrasena) {
            if (!contrasenaNueva || !confirmarContrasena) {
                setError('Por favor, rellena ambos campos de la nueva contraseña');
                return;
            }

            if (contrasenaNueva !== confirmarContrasena) {
                setError('¡Vaya! Las contraseñas nuevas no coinciden');
                return;
            }

            if (contrasenaActual === contrasenaNueva) {
                setError('¡Vaya! La nueva contraseña no puede ser igual que la actual');
                return;
            }
        }

        let fotoArray: number[] | undefined;
        if (typeof foto === 'string') {
            const byteArray = base64ToByteArray(foto);
            fotoArray = Array.from(byteArray);
        }

        const updatedUserState: User = {
            ...userState,
            foto: fotoArray,
            telefono: telefono || userState?.telefono,
            domicilio: domicilio || userState?.domicilio
        };

        if (contrasenaNueva && confirmarContrasena) {
            updatedUserState.contraseña = contrasenaNueva;
        }

        try {
            const success = await checkPassword(updatedUserState);
            if (success) {
                setUserState(updatedUserState);
                setError('¡Datos actualizados correctamente!');
                setTimeout(() => {
                    window.location.reload();
                }, 1200);

            } else {
                setError('Error al actualizar los datos');
            }
        } catch (error) {
            setError('Error al actualizar los datos');
        }
        setContrasenaActual('');
        setContrasenaNueva('');
        setConfirmarContrasena('');
    };

    const handleClickAsignatura = (event: React.MouseEvent<HTMLButtonElement>) => {
        const subjectId = event.currentTarget.getAttribute('data-id');
        if (subjectId) {
            localStorage.setItem('asignaturaId', subjectId);
            console.log({ subjectId })
            navigate('/subject');
        } else {
            console.error("No se pudo obtener el ID de la asignatura");
        }
    };

    const handleClickOpcion = (contenido: string) => {
        setActiveTab(contenido);
        setContenidoActual(contenido);
    };

    const logout = useLogout();

    const handleClickLateral = (opcion: string) => {
        if (opcion === 'Ajustes') {
            setShowSettingsOptions(!showSettingsOptions);
        } else {
            setShowSettingsOptions(false);
            setShowMenu(false);
            setIsLoading(true);
            setTimeout(async () => {
                if (opcion === 'Info') {
                    navigate('/info');
                }

                if (opcion === 'Contacto') {
                    navigate('/contact');
                }

                if (opcion === 'CerrarSesion') {
                    if (userData) {
                        await logout();
                        setUserState(null);
                    }
                }
                setIsLoading(false);
            }, 2000);
        }
    };

    const handleClickSettings = (ajuste: string) => {
        setIsLoading(true);
        setTimeout(() => {
            setPantallaDatos(ajuste);
            setIsLoading(false);
        }, 2000);
    };

    const handleVolverAtras = () => {
        setPantallaDatos('home');
        setContrasenaActual('');
        setContrasenaNueva('');
        setConfirmarContrasena('');
        setError('');
    };

    const handleVolverAtrasListado = () => {
        setPantallaDatos('deleteAlumno');
        setError('');
    };

    const toggleBarra = () => {
        setBarraVisible(!barraVisible);
        if (!barraVisible) {
            setShowSettingsOptions(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'contrasenaActual') setContrasenaActual(value);
        else if (name === 'contrasenaNueva') setContrasenaNueva(value);
        else if (name === 'confirmarContrasena') setConfirmarContrasena(value);
        else if (name === 'domicilio') setDomicilio(value);
        else if (name === 'telefono') setTelefono(value);
        else setUserState((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    };


    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const [contactos, setContactos] = useState<Formulario[]>([]);
    const [expandedContact, setExpandedContact] = useState<number | null>(null);

    useEffect(() => {
        const loadContactos = async () => {
            const contactosData = await getAllFormularios();
            console.log({ contactosData });
            if (contactosData !== null) {
                setContactos(contactosData!);
            }
        };

        loadContactos();
    }, []);

    const handleExpand = async (contacto: Formulario) => {
        if (!contacto.abierto) {
            const updatedContacto = { ...contacto, abierto: true };
            console.log({ updatedContacto })
            await updateContacto(contacto.id!.toString(), updatedContacto);
        }
        setExpandedContact(expandedContact === contacto.id ? null : contacto.id!);
        const loadContactos = async () => {
            const contactosData = await getAllFormularios();
            console.log({ contactosData });
            if (contactosData !== null) {
                setContactos(contactosData!);
            }
        };

        loadContactos();
    };

    const [trimestre, setTrimestre] = useState<string>('Primer Trimestre');
    const [asignaturasPersonas, setAsignaturasPersonas] = useState<SubjectPerson[]>([]);

    const handleTrimestreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTrimestre(event.target.value);
    };

    const getCalificacionByTrimestre = (subjectPerson: SubjectPerson, trimestre: string) => {
        console.log("getCalifPorTrim", { subjectPerson }, { trimestre })
        switch (trimestre) {
            case 'Primer Trimestre':
                return subjectPerson.calificacion1;
            case 'Segundo Trimestre':
                return subjectPerson.calificacion2;
            case 'Tercer Trimestre':
                return subjectPerson.calificacion3;
            case 'Ordinaria':
                return subjectPerson.calificacionOrd;
            case 'Extraordinaria':
                return subjectPerson.calificacionExtra;
        }
    };

    interface FaltasCellProps {
        idAsignatura: number;
        idPersona: number;
        horaTotal?: number;
    }

    const ColumnaFaltas: React.FC<FaltasCellProps> = ({ idAsignatura, idPersona, horaTotal }) => {
        const [faltas, setFaltas] = useState<number | null>(null);
        useEffect(() => {
            const fetchFaltas = async () => {
                const result = await getFaltasPorAsignatura(idAsignatura, idPersona);
                setFaltas(result);
            };

            fetchFaltas();
        }, [idAsignatura, idPersona]);

        if (horaTotal !== undefined) {
            const calcularPorcentajeAbsentismo = (faltas: number, horaTotal: number): number => {
                return (faltas / horaTotal) * 100;
            };
            return (
                <>
                    <td>{faltas !== null ? `${calcularPorcentajeAbsentismo(faltas, horaTotal!).toFixed(2)}%` : 'Cargando...'}</td>
                </>
            );
        } else {
            return (
                <>
                    <td>{faltas !== null ? faltas : 'Cargando...'}</td>
                </>
            );
        }
    };



    return (
        <div className={`home-page ${barraVisible ? 'barra-visible' : ''}`}>
            {isLoading && <LoadingAnimation />}
            <div className="home-page__top-panel">
                <img className='imagen-alumno'
                    src={userPhoto}
                    alt='Icono alumno'
                    width="40"
                    height="40"
                    onClick={toggleBarra} />
            </div>
            <Sidebar
                show={barraVisible}
                showSettingsOptions={showSettingsOptions}
                onClickLateral={handleClickLateral}
                onClickSettings={handleClickSettings}
                esProfesor={esProfesor}
            />
            <div className='home-page__background'></div>
            {(verPantalla === 'cambiarDatos') && !esProfesor ? (
                <FormularioAlumno
                    userState={userState}
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit(handleFormulario)}
                    handleVolverAtras={handleVolverAtras}
                    error={error}
                />
            ) : (verPantalla === 'home') && !esProfesor && (
                <div className="container">
                    <div className="top-panel-options" id='fuenteGrande'>
                        <button
                            className={`pestana ${activeTab === 'Asignaturas' ? 'pestana-activa' : ''}`}
                            onClick={() => handleClickOpcion("Asignaturas")}>
                            Asignaturas</button>
                        <button
                            onClick={() => handleClickOpcion("Calificaciones")}
                            className={`pestana ${activeTab === 'Calificaciones' ? 'pestana-activa' : ''}`}>
                            Calificaciones</button>
                        <button
                            onClick={() => handleClickOpcion("Horarios")}
                            className={`pestana ${activeTab === 'Horarios' ? 'pestana-activa' : ''}`}>
                            Horarios</button>
                    </div>
                    {/* en el name de cada botón, se cogerá el nombre de la asignatura de la bbdd */}
                    {contenidoActual === "Asignaturas" && (
                        <div className="subject-column">
                            {userSubjects.length > 0 ? (
                                subjects.map((item) => {
                                    return (
                                        <button
                                            key={item.id}
                                            className="subject"
                                            id="fuenteAsignaturas"
                                            name={item.nombre}
                                            data-id={item.id}
                                            onClick={handleClickAsignatura}
                                        >
                                            {item.nombre}
                                        </button>
                                    );
                                })
                            ) : (
                                <p>No hay asignaturas disponibles.</p>
                            )}
                        </div>
                    )}

                    {contenidoActual === "Calificaciones" && (
                        <div className="subject-column">
                            <div>

                                <label htmlFor="evaluacion">Selecciona evaluación: </label>
                                <select value={trimestre} onChange={handleTrimestreChange}>
                                    <option value="Primer Trimestre">Primera Evaluación</option>
                                    <option value="Segundo Trimestre">Segunda Evaluación</option>
                                    <option value="Tercer Trimestre">Tercera Evaluación</option>
                                    <option value="Ordinaria">Evaluación Ordinaria</option>
                                    <option value="Extraordinaria">Evaluación Extraordinaria</option>
                                </select>
                            </div>

                            {userSubjects.length > 0 ? (
                                <table className="custom-table3">
                                    <thead>
                                        <tr>
                                            <th>Asignatura</th>
                                            <th>Calificación</th>
                                            <th>Faltas de asistencia</th>
                                            <th>Porcentaje de absentismo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userSubjects.map((subjectPerson) => {
                                            const asignatura = subjects.find(subject => subject.id === subjectPerson.idAsignatura);
                                            return (
                                                <tr key={`${subjectPerson.idAsignatura}-${subjectPerson.idPersona}`}>
                                                    <td>{asignatura ? asignatura.nombre : 'Asignatura desconocida'}</td>
                                                    <td>{getCalificacionByTrimestre(subjectPerson, trimestre)}</td>
                                                    <ColumnaFaltas
                                                        idAsignatura={subjectPerson.idAsignatura}
                                                        idPersona={subjectPerson.idPersona}
                                                    />
                                                    <ColumnaFaltas
                                                        idAsignatura={subjectPerson.idAsignatura}
                                                        idPersona={subjectPerson.idPersona}
                                                        horaTotal={asignatura ? asignatura.horaTotal : 0}
                                                    />
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No hay asignaturas disponibles.</p>
                            )}
                        </div>
                    )}

                    {contenidoActual === "Horarios" && (
                        <div>
                            <Horario gradoId={userData!.idGrado!} cursoId={userData!.idCurso!} />
                        </div>
                    )}

                </div>
            )}

            {/*A partir de aquí es lo que se muestra en pantalla cuando es profesor */}

            <div className='home-page__background'></div>
            {(verPantalla === 'cambiarDatos') && esProfesor ? (
                <FormularioProfesor
                    userState={userState}
                    setUserState={setUserState}
                    handleSubmit={handleFormularioProfe}
                    handleVolverAtras={handleVolverAtras}
                    handleFileChange={handleFileChange}
                    error={error}
                    handleInputChange={handleInputChange} />
            ) : (verPantalla === 'home') && esProfesor && (
                <div className="container">
                    <div className="top-panel-options" id='fuenteGrande'>
                        <button
                            className={`pestana ${activeTab === 'Asignaturas' ? 'pestana-activa' : ''}`}
                            onClick={() => handleClickOpcion("Asignaturas")}>
                            Asignaturas</button>
                        <button
                            onClick={() => handleClickOpcion("Horarios")}
                            className={`pestana ${activeTab === 'Horarios' ? 'pestana-activa' : ''}`}>
                            Horarios</button>
                        <button
                            onClick={() => handleClickOpcion("Contacto")}
                            className={`pestana ${activeTab === 'Contacto' ? 'pestana-activa' : ''}`}>
                            Buzón de contacto</button>
                    </div>
                    {/* en el name de cada botón, se cogerá el nombre de la asignatura de la bbdd */}
                    {contenidoActual === "Asignaturas" && (
                        <div className="subject-column">
                            {userSubjects.length > 0 ? (
                                subjects.map((item) => {
                                    return (
                                        <button
                                            key={item.id}
                                            className="subject"
                                            id="fuenteAsignaturas"
                                            name={item.nombre}
                                            data-id={item.id}
                                            onClick={handleClickAsignatura}
                                        >
                                            {item.nombre}
                                        </button>
                                    );
                                })
                            ) : (
                                <p>No hay asignaturas disponibles.</p>
                            )}

                        </div>
                    )}

                    {contenidoActual === 'Contacto' && (
                        <div className="subject-column">
                            {contactos.length > 0 ? (
                                contactos.map((contacto) => (
                                    <FormulariosContacto
                                        key={contacto.id}
                                        contacto={contacto}
                                        expanded={expandedContact === contacto.id}
                                        onExpand={() => handleExpand(contacto)}
                                    />
                                ))
                            ) : (
                                <p>No hay solicitudes de contacto disponibles.</p>
                            )}
                        </div>
                    )}

                    {contenidoActual === "Horarios" && (
                        <div>
                            <Horario gradoId={userData!.idGrado!} cursoId={userData!.idCurso!} />
                        </div>
                    )}
                </div>
            )}

            <div className='home-page__background'></div>
            {verPantalla === 'addAlumno' && (
                <FormularioAddAlumno
                    handleFormularioAddAlumno={handleFormularioAddAlumno}
                    handleVolverAtras={handleVolverAtras}
                    cursos={cursos}
                    grados={grados}
                    setFormData={setFormData}
                    error={error}
                />
            )}
            <div className='home-page__background'></div>
            {verPantalla === 'deleteAlumno' && (
                <div className="containerLista">
                    <div className="flecha-atras" onClick={() => handleVolverAtras()}></div>
                    <table className="custom-table3">
                        <thead>
                            <tr>
                                <th>Foto</th>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>DNI</th>
                                <th>Curso</th>
                                <th>Grado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alumnos.map((alumno) => (
                                <tr key={alumno.id}>
                                    <td>
                                        <img
                                            src={alumno.foto ? `data:image/jpeg;base64,${alumno.foto}` : defaultPhoto}
                                            alt="Foto de perfil"
                                            className="miniatura"
                                        />
                                    </td>
                                    <td>{alumno.nombre}</td>
                                    <td>{alumno.apellidos}</td>
                                    <td>{alumno.dni}</td>
                                    <td>{alumno.curso}</td>
                                    <td>{alumno.grado}</td>
                                    <td>
                                        <FaEdit onClick={() => handleEditAlumno(alumno.id)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                                        <FaTrash onClick={() => handleDeleteAlumno(alumno.id)} style={{ cursor: 'pointer' }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            )}
            <div className='home-page__background'></div>
            {verPantalla === 'editarAlumno' && (

                <FormularioEditarAlumno
                    userState={dataAlumnoEditar}
                    setUserState={setDataAlumnoEditar}
                    handleSubmit={handleSubmit(handleFormularioEditarAlumno)}
                    handleVolverAtras={handleVolverAtrasListado}
                    error={error}
                />


            )}

        </div >
    );

}
export default Home;
