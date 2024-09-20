import { useNavigate } from "react-router-dom";
import "./Subject.css"

import { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { usePassword } from "../../hooks/usePassword";
import { useUser } from "../../hooks/useUser";
import { addAlumno } from "../../api/auth/addAlumno";
import { useCursos, useGrados } from "../../hooks/useCursosYGrados";
import Sidebar from "../../utils/Sidebar";
import { getSubject } from "../../api/auth/subject";
import { getAsignaturaPersona, getUserSubject, getUsers, updateAsignaturaPersona } from "../../api/auth/personBySubject";
import useEnviarFaltas from "../../hooks/useEnviarFaltas";
import { getAllStudents, getData } from "../../api/auth/user";
import FormularioVerAlumno from "../../utils/FormularioVerAlumno";
import useLogout from "../../hooks/useLogout";
import { FaArrowAltCircleRight, FaEdit, FaFilePdf, FaSadTear, FaSave, FaTrash } from "react-icons/fa";
import React from "react";
import Modal from 'react-modal';
import { createArchivo, deleteArchivo, getArchivo, getArchivos } from "../../api/auth/temario";
import imageCompression from "browser-image-compression";
import { eliminarAlumno } from "../../api/auth/eliminarAlumno";
import { updateUser } from "../../api/auth/updateUser";
import { parserCurso, parserGrado } from "../../api/auth/parserGradoYCurso";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import FormularioProfesor from "../../utils/FormularioProfesor";
import FormularioEditarAlumno from "../../utils/FormularioEditarAlumno";
import FormularioAlumno from "../../utils/FormularioAlumno";
import FormularioAddAlumno from "../../utils/FormularioAddAlumno";
import { getArchivosPorIdEntrega, getArchivosPorIdEntregaIdPersona, updateArchivoPersona } from "../../api/auth/archivoPersona";
import FileUpload from "../../utils/SubirArchivos";
import axios from "axios";
import Foro from "../foro/Foro";
Modal.setAppElement('#root');

export const Subject = () => {
    const navigate = useNavigate();
    const [buttonName, setButtonName] = useState('');
    const { handleSubmit } = useForm<User>();
    const [esProfesor, setEsProfesor] = useState(false);
    const { userData } = useUser();
    const { enviarFaltas, loading, error1 } = useEnviarFaltas();
    const [formData, setFormData] = useState<User>({
        id: '',
        nombre: '',
        apellido1: '',
        apellido2: '',
        dni: '',
        telefono: '',
        domicilio: '',
        correoElectronico: '',
        usuario: '',
        contraseña: '',
        fechaNac: new Date("2024-05-05"),
        esProfe: true
    });

    const [userState, setUserState] = useState<User | null>(userData);

    const [subject, setSubject] = useState<Subject>();
    const [personas, setPersonas] = useState<SubjectPerson[]>([]);
    const [alumnosAsignatura, setAlumnos] = useState<FaltaAsistencia[]>([]);
    const [alumnos, setListadoAlumnos] = useState<any[]>([]);
    const cursos = useCursos();
    const grados = useGrados();

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
                id: userData.id
            });
        }

        const storedSubjectId = localStorage.getItem('asignaturaId');
        console.log({ storedSubjectId })
        getSubject(storedSubjectId!)
            .then(subjectData => {
                setSubject(subjectData);
            })
            .catch(error => console.error('Error al recuperar las asignaturas del usuario:', error));

        setButtonName(subject?.nombre || 'No funciona');
        console.log({ subject })

        if (subject?.id) {
            getUserSubject(storedSubjectId!)
                .then(subjectsData => {
                    setPersonas(subjectsData);
                    console.log({ subjectsData });
                })
                .catch(error => console.error('Error al recuperar las asignaturas del usuario:', error));
            getUsers(storedSubjectId!)
                .then(subjectData => {
                    const nuevosAlumnos = subjectData.map((user: User) => ({
                        id: user.id,
                        nombre: user.nombre,
                        apellidos: `${user.apellido1} ${user.apellido2}`,
                        esProfe: user.esProfe,
                        falta: false,
                        faltaJustificada: false,
                        idAsignatura: parseInt(storedSubjectId!, 10) // Poner el id de la asignatura actual
                    }))
                        .filter((user: User) => !user.esProfe); // Filtrar solo alumnos, para que no aparezcan profes en listado

                    setAlumnos(nuevosAlumnos);
                    console.log("Listado alumnos: ", { nuevosAlumnos });
                })
                .catch(error => console.error('Error al recuperar los alumnos:', error));
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
                        setListadoAlumnos(alumnos);
                        console.log("Listado alumnos: ", alumnos);
                    } catch (error) {
                        console.error('Error al procesar los datos de los alumnos:', error);
                    }
                })
                .catch(error => console.error('Error al recuperar los alumnos:', error));

            setContent('Asistencia');
            setBody('Asistencia');
            setActiveTab('Asistencia');
        } else {
            setContent('Temario y entregas');
            setBody('Temario y entregas');
            setActiveTab('Temario y entregas');
        }
    }, [userData]);

    const [activeTab, setActiveTab] = useState('');
    const [content, setContent] = useState('');
    const [body, setBody] = useState('');

    const changeContent = (buttonName: string) => {
        setContent(buttonName);
        setActiveTab(buttonName);
    };

    const [showSettingsOptions, setShowSettingsOptions] = useState(false);
    const [verPantalla, setPantallaDatos] = useState('home');
    const [barraVisible, setBarraVisible] = useState(false);
    const [error, setError] = useState('');
    const [contrasenaActual, setContrasenaActual] = useState('');
    const [contrasenaNueva, setContrasenaNueva] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [domicilio, setDomicilio] = useState('');
    const [telefono, setTelefono] = useState('');
    const { checkPassword } = usePassword();
    const [idAlumnoEditar, setIdAlumnoEditar] = useState('');
    const [idAlumnoEliminar, setIdAlumnoEliminar] = useState('');
    const [dataAlumnoEditar, setDataAlumnoEditar] = useState<User | null>();
    const [dataAlumnoEliminar, setDataAlumnoEliminar] = useState<User | null>();
    const [foto, setFoto] = useState<string | ArrayBuffer | null>(null);
    const defaultPhoto = "/src/assets/default-photo.jpg";
    const userPhoto = userData?.foto
        ? `data:image/png;base64,${userData.foto}`
        : defaultPhoto;

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
            const byteArray = base64ToByteArray(foto);
            fotoArray = Array.from(byteArray);
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
            foto: fotoArray,
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

    const logout = useLogout();

    const handleClickLateral = async (opcion: string) => {
        if (opcion === 'Ajustes') {
            setShowSettingsOptions(!showSettingsOptions);
        } else {
            setShowSettingsOptions(false);
        }

        if (opcion === 'Info') {
            navigate('/info');
        }

        if (opcion === 'Contacto') {
            navigate('/contact');
        }
        if (opcion === 'CerrarSesion') {
            if (userData) {
                await logout();
            }
        }
    }

    const handleClickSettings = (ajuste: string) => {
        setPantallaDatos(ajuste);
    }

    const handleVolverAtras = () => {
        setPantallaDatos('home');
        setContrasenaActual('');
        setContrasenaNueva('');
        setConfirmarContrasena('');
        setError('');
    }

    const handleVolverAtrasHome = () => {
        navigate('/');
    }

    const toggleBarra = () => {
        setBarraVisible(!barraVisible);
        if (!barraVisible) {
            setShowSettingsOptions(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleFaltaChange = (id: number, tipoFalta: string) => {
        setAlumnos(prevAlumnos =>
            prevAlumnos.map(alumno => {
                if (alumno.id === id) {
                    if (tipoFalta === 'falta') {
                        return { ...alumno, falta: !alumno.falta, faltaJustificada: false };
                    } else {
                        return { ...alumno, faltaJustificada: !alumno.faltaJustificada, falta: false };
                    }
                }
                return alumno;
            })
        );
    };

    const handleEnviarFaltas = () => {
        const faltas = alumnosAsignatura.filter(alumno => alumno.falta || alumno.faltaJustificada).map(alumno => ({
            id: alumno.id,
            idAsignatura: alumno.idAsignatura,
            falta: alumno.falta,
            faltaJustificada: alumno.faltaJustificada
        }));
        enviarFaltas(faltas);
        console.log("Faltas de asistencia enviadas:", { faltas });

        setAlumnos(prevAlumnos =>
            prevAlumnos.map(alumno => ({
                ...alumno,
                falta: false,
                faltaJustificada: false
            }))
        );

        setError("¡Faltas enviadas!");
        setTimeout(() => setError(""), 3000);
    };

    const [hoveredAlumno, setHoveredAlumno] = useState<User | null>(null);
    const [hoveredPosition, setHoveredPosition] = useState<{ x: number, y: number } | null>(null);
    const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [alumnoParaVer, setAlumnoParaVer] = useState<User>();

    const handleRatonEncima = async (alumno: FaltaAsistencia, event: React.MouseEvent) => {
        const position = { x: event.clientX, y: event.clientY };
        const idAlumno = alumno.id.toString();
        const dataAlumno = await getData(idAlumno);
        setHoverTimeout(setTimeout(() => {
            setHoveredAlumno(dataAlumno!);
            setHoveredPosition(position);
        }, 1000));
    };

    const handleRatonNoEncima = () => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            setHoverTimeout(null);
        }
        hideTimeoutRef.current = setTimeout(() => {
            setHoveredAlumno(null);
            setHoveredPosition(null);
        }, 500);
    };

    const handleVerDatos = async (id: string) => {
        console.log("Ver datos del alumno con id:", id);
        const dataAlumno = await getData(id);
        setAlumnoParaVer(dataAlumno);
        console.log({ dataAlumno })
        setHoveredAlumno(null);
        setHoveredPosition(null);
        setPantallaDatos('verAlumno');
    };

    const handleVolverAtrasListado = () => {
        setPantallaDatos('home');
    };

    const idTrimestre = "1";
    const [entregas, setEntregas] = useState<Archivo[]>([]);
    const [subidas, setSubidas] = useState<ArchivoPersona[]>([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newEntrega, setNewEntrega] = useState<Archivo>({
        nombre: '',
        instrucciones: '',
        fechaEntrega: '',
        datos: [],
        nombreArchivo: '',
        tipo: ''
    });
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const storedSubjectId = localStorage.getItem('asignaturaId');
    useEffect(() => {
        const fetchArchivos = async () => {
            try {
                const data = await getArchivos(storedSubjectId!, idTrimestre);
                setEntregas(data);
                const archivosPromises = data.map((entrega: Archivo) => getArchivosPorIdEntrega(entrega.id!.toString()));
                console.log({ archivosPromises });
                const archivosDataArrays: ArchivoPersona[][] = await Promise.all(archivosPromises);
                const archivosData: ArchivoPersona[] = archivosDataArrays.flat();
                console.log({ archivosData })
                setSubidas(archivosData);
                console.log({ subidas });
            } catch (error) {
                console.error('Error al obtener los archivos:', error);
            }
        };

        fetchArchivos();
    }, [storedSubjectId, idTrimestre]);

    const handleInputChangeEntrega = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewEntrega({ ...newEntrega, [name]: value });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const arrayBuffer = reader.result as ArrayBuffer;
                const byteArray = new Uint8Array(arrayBuffer);
                setNewEntrega(prev => ({
                    ...prev,
                    datos: Array.from(byteArray)
                }));
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const handleSaveEntrega = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); //no recargar pagina
        try {
            await createArchivo(newEntrega, storedSubjectId!, idTrimestre);
            setModalIsOpen(false);
            const updatedEntregas = await getArchivos(storedSubjectId!, idTrimestre);
            setEntregas(updatedEntregas);
            setNewEntrega({
                nombre: '',
                instrucciones: '',
                fechaEntrega: '',
                datos: [],
                tipo: ''
            });
            setContent('Temario y entregas');
        } catch (error) {
            console.error('Error al crear la entrega:', error);
        }
    };

    const handleFileChangeFoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleOpenModal = () => {
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
        setNewEntrega({
            nombre: '',
            instrucciones: '',
            fechaEntrega: '',
            nombreArchivo: '',
            datos: []
        });
    };

    const toggleRowExpansion = (id: number) => {
        setExpandedRow(expandedRow === id ? null : id);
    };
    function handleEditarEntrega(id: number | undefined) {
        console.log("editar ", { id })
    }

    function handleBorrarEntrega(id: number) {
        MySwal.fire({
            title: '¿Estás seguro?',
            text: `¿Estás seguro de que quieres eliminar la tarea?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'No, cancelar',
        }).then(async (result: { isConfirmed: any; }) => {
            if (result.isConfirmed) {
                await deleteArchivo(id.toString());
                const updatedEntregas = await getArchivos(storedSubjectId!, idTrimestre);
                setEntregas(updatedEntregas);
            }
        })
    }

    const base64ToArrayBuffer = (base64: string): number[] => {
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return Array.from(bytes);
    };

    const [subidasComprobadas, setSubidasComprobadas] = useState<{ entregaId: number | undefined; archivoExistente: any; }[]>([]);

    useEffect(() => {
        const comprobarSubidas = async () => {
            if (userData && entregas.length > 0) {
                const comprobaciones = await Promise.all(entregas.map(async (entrega) => {
                    if (entrega.tipo === 'examen') {
                        const archivoExistente = await getArchivosPorIdEntregaIdPersona(entrega.id!.toString(), userData.id);
                        return { entregaId: entrega.id, archivoExistente };
                    }
                    return { entregaId: entrega.id, archivoExistente: null };
                }));
                setSubidasComprobadas(comprobaciones);
                console.log({ comprobaciones })
            }
        };
        comprobarSubidas();
    }, [entregas, userData]);

    const getNombrePersona = async (personaId: string) => {
        try {
            const response = await getData(personaId);
            return `${response.nombre}_${response.apellido1}`;
        } catch (error) {
            console.error('Error al obtener los datos de la persona:', error);
            return 'Desconocido';
        }
    };

    const handleFileUpload = async (file: File, entregaId: number, tipo: string) => {
        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const base64File = reader.result?.toString().split(',')[1];
                if (base64File) {
                    const nombreArchivo = `${userData?.nombre}_${userData?.apellido1}_${file.name}`;
                    const archPersNuevo: ArchivoPersona = {
                        archivo: {
                            nombre: nombreArchivo,
                            datos: base64ToArrayBuffer(base64File)
                        },
                        datos: base64ToArrayBuffer(base64File),
                        persona: userData!,
                        id: {
                            personaId: userData!.id,
                            archivoId: entregaId.toString()
                        },
                        calificacion: 0,
                        entregado: true,
                        nombreArchivo: nombreArchivo
                    };

                    console.log({archPersNuevo})
                    await updateArchivoPersona(archPersNuevo, entregaId.toString(), userData!.id);
                    const archivosDataArrays: ArchivoPersona[][] = await Promise.all(entregas.map((entrega: Archivo) => getArchivosPorIdEntrega(entrega.id!.toString())));
                    const archivosData: ArchivoPersona[] = archivosDataArrays.flat();
                    setSubidas(archivosData);
                    console.log({ subidas });

                    // Actualizar el estado de la entrega
                    setEntregas(prevEntregas =>
                        prevEntregas.map(entrega =>
                            entrega.id === entregaId ?
                                {
                                    ...entrega,
                                    archivoSubido: true,
                                    nombreArchivo: nombreArchivo,
                                    datos: base64ToArrayBuffer(base64File)
                                } : entrega
                        )
                    );
                }
            };
        } catch (error) {
            console.error('Error al subir el archivo:', error);
        }
    };


    const handleInputChangeTipo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setNewEntrega(prevState => ({
            ...prevState,
            tipo: prevState.tipo === value ? '' : value
        }));
    };

    const [trimestre, setTrimestre] = useState<string>('Primera Evaluación');
    const [asignaturasPersonas, setAsignaturasPersonas] = useState<SubjectPerson[]>([]);
    const [nombresEnteros, setNombresEnteros] = useState<string[]>([]);

    const handleTrimestreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTrimestre(event.target.value);
    };

    useEffect(() => {
        const fetchAsignaturasPersonas = async () => {
            try {
                const data = await Promise.all(alumnosAsignatura.map(alumno => getAsignaturaPersona(storedSubjectId!, alumno.id.toString())));
                setAsignaturasPersonas(data);
                //const personas: User [] = data.map (d => d.persona);
                //const nombres = personas.map(d => `${d.nombre} ${d.apellido1} ${d.apellido2}`);
                //setNombresEnteros(nombres);
                const nombres = alumnosAsignatura.map(alumno => `${alumno.nombre} ${alumno.apellidos}`);
                setNombresEnteros(nombres);
            } catch (error) {
                console.error('Error fetching asignaturasPersonas:', error);
            }
        };

        fetchAsignaturasPersonas();
    }, [storedSubjectId, alumnosAsignatura]);

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

    const [editableRowId, setEditableRowId] = useState<number | null>(null);
    const [editableCalificaciones, setEditableCalificaciones] = useState<{ [key: string]: number | null }>({});

    const handleEdit = (subjectPersonId: number) => {
        setEditableRowId(subjectPersonId);
        const subjectPerson = asignaturasPersonas.find(sp => sp.id.idPersona === subjectPersonId);
        if (subjectPerson) {
            const calificacion = getCalificacionByTrimestre(subjectPerson, trimestre);
            setEditableCalificaciones({ ...editableCalificaciones, [subjectPersonId]: calificacion });
        }
    };

    const handleSave = async (subjectPersona: SubjectPerson) => {
        try {
            // Acceder correctamente a los IDs de asignatura y persona
            const asignaturaId = subjectPersona.idAsignatura;
            const personaId = subjectPersona.idPersona;

            // Encontrar el subjectPerson correcto en el estado
            const subjectPerson = asignaturasPersonas.find(sp => sp.idPersona === personaId);

            if (subjectPerson) {
                const updatedSubjectPerson = { ...subjectPerson };
                const newCalificacion = editableCalificaciones[personaId] ?? 0;

                // Actualizar la calificación según el trimestre
                switch (trimestre) {
                    case 'Primer Trimestre':
                        updatedSubjectPerson.calificacion1 = newCalificacion;
                        break;
                    case 'Segundo Trimestre':
                        updatedSubjectPerson.calificacion2 = newCalificacion;
                        break;
                    case 'Tercer Trimestre':
                        updatedSubjectPerson.calificacion3 = newCalificacion;
                        break;
                    case 'Ordinaria':
                        updatedSubjectPerson.calificacionOrd = newCalificacion;
                        break;
                    case 'Extraordinaria':
                        updatedSubjectPerson.calificacionExtra = newCalificacion;
                        break;
                    default:
                        break;
                }

                // Enviar la actualización al backend
                await axios.put(`http://localhost:8080/api/asignaturaPersona`, updatedSubjectPerson, {
                    params: {
                        asignaturaId: asignaturaId,
                        personaId: personaId
                    }
                });

                // Actualizar el estado local con la nueva calificación
                setAsignaturasPersonas(prevState =>
                    prevState.map(sp =>
                        sp.idPersona === personaId ? updatedSubjectPerson : sp
                    )
                );

                // Restablecer el estado de edición
                setEditableRowId(null);
                setEditableCalificaciones({ ...editableCalificaciones, [personaId]: null });
            }
        } catch (error) {
            console.error('Error saving calificacion:', error);
        }
    };


    const handleCalificacionChange = (event: React.ChangeEvent<HTMLInputElement>, personaId: number) => {
        setEditableCalificaciones({ ...editableCalificaciones, [personaId]: Number(event.target.value) });
    };

    return (
        <div className={`home-page ${barraVisible ? 'barra-visible' : ''}`}>
            <div className="home-page__top-panel">
                <img className='imagen-alumno'
                    src={userPhoto}
                    alt='Icono alumno'
                    width="40"
                    height="40"
                    onClick={toggleBarra} />
                <h1 id='fuenteGrandeS'>{buttonName}</h1>
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
                <div id="fuenteChiquita" className="containerSub">
                    <div className="flecha-atras" onClick={() => handleVolverAtrasHome()}></div>
                    <div className="tabs">
                        <button className={`tab ${activeTab === 'Temario y entregas' ? 'active' : ''}`} onClick={() => changeContent('Temario y entregas')}>Temario y entregas</button>                        <button className={`tab ${activeTab === 'Foro' ? 'active' : ''}`} onClick={() => changeContent('Foro')}>Foro</button>
                        <button className={`tab ${activeTab === 'Exámenes y Calificaciones' ? 'active' : ''}`} onClick={() => changeContent('Exámenes y Calificaciones')}>Exámenes y Calificaciones</button>
                    </div>

                    {content === 'Temario y entregas' && (
                        <div>
                            <table className="custom-tableEntrega">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                        <th>Fecha de Entrega</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {entregas.map((entrega) => {
                                        const archivoSubido = subidas.find(
                                            (archivo) => archivo.id.archivoId === entrega.id!.toString() && archivo.id.personaId === userData?.id
                                        );

                                        return (
                                            <React.Fragment key={entrega.id}>
                                                <tr onClick={() => toggleRowExpansion(entrega.id!)}>
                                                    <td>{entrega.nombre}</td>
                                                    <td>{entrega.instrucciones}</td>
                                                    <td className="numeritoGrandeYCentro">{entrega.fechaEntrega}</td>
                                                    <td>
                                                        {entrega.tipo !== 'temario' && (
                                                            <div>
                                                                {archivoSubido ? (
                                                                    <span>Archivo subido: {archivoSubido.nombreArchivo}</span>
                                                                ) : (
                                                                    <FileUpload
                                                                        onFileUpload={(file) => handleFileUpload(file, entrega.id!, entrega.tipo!)}
                                                                        disabled={entrega.tipo === 'examen' && archivoSubido !== undefined}
                                                                    />
                                                                )}
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                                {expandedRow === entrega.id && (
                                                    <tr>
                                                        <td colSpan={4}>
                                                            <div>
                                                                <p>Fecha de subida: {entrega.fechaEntrega}</p>
                                                                {entrega.datos && (
                                                                    <a
                                                                        href={`data:application/pdf;base64,${entrega.datos}`}
                                                                        download={entrega.nombre}
                                                                    >
                                                                        Descargar archivo
                                                                    </a>
                                                                )}
                                                                {entrega.tipo !== 'temario' && (
                                                                    <div>
                                                                        <p>Archivos Asociados:</p>
                                                                        {subidas.filter(archivo => archivo.personaId === userData?.id && archivo.datos !== null).map((archivo, idx) => (
                                                                            <div key={idx}>
                                                                                <a
                                                                                    href={`data:application/pdf;base64,${archivo.datos}`}
                                                                                    download={archivo.nombreArchivo}
                                                                                    style={{ display: 'flex', alignItems: 'center' }}
                                                                                >
                                                                                    <FaFilePdf style={{ marginRight: '8px' }} />
                                                                                    {archivo.nombreArchivo}
                                                                                </a>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}

                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        );
                                    })}

                                </tbody>
                            </table>


                        </div>
                    )}

                    {content === 'Foro' && (
                        <div>
                            <Foro />
                        </div>
                    )}
                </div>
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
            {(verPantalla === 'cambiarDatos') && esProfesor ? (
                <FormularioProfesor
                    userState={userState}
                    setUserState={setUserState}
                    handleSubmit={handleFormularioProfe}
                    handleVolverAtras={handleVolverAtras}
                    handleFileChange={handleFileChangeFoto}
                    error={error}
                    handleInputChange={handleInputChange} />
            ) : (verPantalla === 'home') && esProfesor && (
                <div id="fuenteChiquita" className="containerSub">
                    <div className="flecha-atras" onClick={() => handleVolverAtrasHome()}></div>
                    <div className="tabs">
                        <button className={`tab ${activeTab === 'Asistencia' ? 'active' : ''}`} onClick={() => changeContent('Asistencia')}>Asistencia</button>
                        <button className={`tab ${activeTab === 'Temario y entregas' ? 'active' : ''}`} onClick={() => changeContent('Temario y entregas')}>Temario y entregas</button>
                        <button className={`tab ${activeTab === 'Foro' ? 'active' : ''}`} onClick={() => changeContent('Foro')}>Foro</button>
                        <button className={`tab ${activeTab === 'Exámenes y Calificaciones' ? 'active' : ''}`} onClick={() => changeContent('Exámenes y Calificaciones')}>Exámenes y Calificaciones</button>
                    </div>
                    {content === 'Asistencia' && (
                        <div>
                            <div className="table-container">
                                <table className="custom-table2">
                                    <thead>
                                        <tr>
                                            <th id="fuenteCabecera">Nombre</th>
                                            <th id="fuenteCabecera">Apellidos</th>
                                            <th id="fuenteCabecera">Falta</th>
                                            <th id="fuenteCabecera">Falta justificada</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {alumnosAsignatura.map(alumno => (
                                            <tr key={alumno.id}>
                                                <td
                                                    onMouseEnter={(event) => handleRatonEncima(alumno, event)}
                                                    onMouseLeave={handleRatonNoEncima}
                                                >
                                                    {alumno.nombre}
                                                </td>
                                                <td>{alumno.apellidos}</td>
                                                <td><input type="checkbox" checked={alumno.falta} onChange={() => handleFaltaChange(alumno.id, 'falta')} /></td>
                                                <td><input type="checkbox" checked={alumno.faltaJustificada} onChange={() => handleFaltaChange(alumno.id, 'faltaJustificada')} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div>
                                {loading && <p>Loading...</p>}
                                {error && <p>{error}</p>}
                                <button className="enviarFaltas" id="fuenteChiquita" onClick={handleEnviarFaltas}> Enviar faltas de asistencia</button>
                            </div>
                            {hoveredAlumno && hoveredPosition && (
                                <div
                                    className="ventana-flotante"
                                    style={{
                                        top: hoveredPosition.y,
                                        left: hoveredPosition.x,
                                        zIndex: 1000,
                                    }}
                                    onMouseEnter={() => {
                                        if (hideTimeoutRef.current) {
                                            clearTimeout(hideTimeoutRef.current);
                                        }
                                    }}
                                    onMouseLeave={handleRatonNoEncima}
                                >
                                    <img
                                        src={hoveredAlumno.foto ? `data:image/jpeg;base64,${hoveredAlumno.foto}` : defaultPhoto}
                                        alt="Foto de perfil"
                                        className="foto-redonda"
                                    />
                                    <button onClick={() => handleVerDatos(hoveredAlumno.id)}>Ver Datos</button>
                                </div>
                            )}
                        </div>
                    )}

                    {content === 'Foro' && (
                        <div>
                            <Foro />
                        </div>
                    )}

                    {content === 'Temario y entregas' && (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                                <button onClick={handleOpenModal}>Crear Entrega</button>
                            </div>
                            <table className="custom-tableEntrega">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                        <th>Fecha de Entrega</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {entregas.map((entrega) => (
                                        <React.Fragment key={entrega.id}>
                                            <tr onClick={() => toggleRowExpansion(entrega.id!)}>
                                                <td>{entrega.nombre}</td>
                                                <td>{entrega.instrucciones}</td>
                                                <td>{entrega.fechaEntrega}</td>
                                                <td>
                                                    <button onClick={(e) => { e.stopPropagation(); handleEditarEntrega(entrega.id); }}><FaEdit /></button>
                                                    <button onClick={(e) => { e.stopPropagation(); handleBorrarEntrega(entrega.id!); }}><FaTrash /></button>
                                                </td>
                                            </tr>
                                            {expandedRow === entrega.id && (
                                                <tr>
                                                    <td colSpan={4}>
                                                        <div>
                                                            <p>Fecha de subida: {entrega.fechaEntrega}</p>
                                                            {entrega.datos && (
                                                                <a
                                                                    href={`data:application/pdf;base64,${(entrega.datos)}`}
                                                                    download={entrega.nombre}
                                                                >
                                                                    Descargar archivo
                                                                </a>
                                                            )}
                                                            <p>Archivos Asociados:</p>
                                                            {subidas.filter(archivo => archivo.entregado && archivo.datos !== null && archivo.idArchivo ===
                                                                entrega.id
                                                            ).map((archivo, idx) => (
                                                                <div key={idx}>
                                                                    <a
                                                                        href={`data:application/pdf;base64,${archivo.datos}`}
                                                                        download={`${archivo.nombreArchivo}`}
                                                                        style={{ display: 'flex', alignItems: 'center' }}
                                                                    >
                                                                        <FaFilePdf style={{ marginRight: '8px' }} />
                                                                        {archivo.nombreArchivo}
                                                                    </a>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}

                                </tbody>
                            </table>

                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={handleCloseModal}
                                className="modal-content"
                                overlayClassName="modal-overlay"
                                contentLabel="Crear Entrega"
                            >
                                <h2>Crear Entrega</h2>
                                <form>
                                    <label>
                                        <span>Nombre:</span>
                                        <input type="text" name="nombre" value={newEntrega.nombre} onChange={handleInputChangeEntrega} />
                                    </label>
                                    <label>
                                        <span>Descripción:</span>
                                        <input type="text" name="instrucciones" value={newEntrega.instrucciones} onChange={handleInputChangeEntrega} />
                                    </label>
                                    <label>
                                        <span>Fecha de Entrega:</span>
                                        <input type="date" name="fechaEntrega" value={newEntrega.fechaEntrega} onChange={handleInputChangeEntrega} />
                                    </label>
                                    <label>
                                        <span>Archivo:</span>
                                        <input type="file" name="archivo" onChange={handleFileChange} />
                                    </label>
                                    <label>
                                        <span>Tipo de subida:</span>
                                        <div>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="tipo"
                                                    value="trabajo"
                                                    checked={newEntrega.tipo === 'trabajo'}
                                                    onChange={handleInputChangeTipo}
                                                /> Trabajo
                                            </label>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="tipo"
                                                    value="temario"
                                                    checked={newEntrega.tipo === 'temario'}
                                                    onChange={handleInputChangeTipo}
                                                /> Temario
                                            </label>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="tipo"
                                                    value="examen"
                                                    checked={newEntrega.tipo === 'examen'}
                                                    onChange={handleInputChangeTipo}
                                                /> Examen
                                            </label>
                                        </div>
                                    </label>

                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <button className="button1" onClick={handleCloseModal}>Cancelar</button>
                                        <button className="button1" onClick={handleSaveEntrega}>Guardar</button>

                                    </div>
                                </form>

                            </Modal>
                        </div>
                    )}

                    {content === 'Exámenes y Calificaciones' && (
                        <div>
                            <select value={trimestre} onChange={handleTrimestreChange}>
                                <option value="Primer Trimestre">Primera Evaluación</option>
                                <option value="Segundo Trimestre">Segunda Evaluación</option>
                                <option value="Tercer Trimestre">Tercera Evaluación</option>
                                <option value="Ordinaria">Evaluación Ordinaria</option>
                                <option value="Extraordinaria">Evaluación Extraordinaria</option>
                            </select>

                            <table style={{ width: '100%' }} className="centrar">
                                <thead>
                                    <tr>
                                        <th>Nombre y Apellidos</th>
                                        <th>Calificación</th>
                                        <th>Editar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {asignaturasPersonas.map((subjectPerson, index) => (
                                        <tr key={`${subjectPerson.idAsignatura}-${subjectPerson.idPersona}`}>
                                            <td>{nombresEnteros[index]}</td>
                                            <td className="numeritoGrandeYCentro">
                                                {editableRowId === subjectPerson.idPersona ? (
                                                    <input
                                                        type="number"
                                                        value={editableCalificaciones[subjectPerson.idPersona] ?? ''}
                                                        onChange={(e) => handleCalificacionChange(e, subjectPerson.idPersona)}
                                                        style={{ width: '60px' }}
                                                    />
                                                ) : (
                                                    getCalificacionByTrimestre(subjectPerson, trimestre)
                                                )}
                                            </td>
                                            <td>
                                                {editableRowId === subjectPerson.idPersona ? (
                                                    <button onClick={() => handleSave(subjectPerson)}><FaArrowAltCircleRight /></button>
                                                ) : (
                                                    <button onClick={() => handleEdit(subjectPerson.idPersona)}><FaEdit /></button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>
            )}

            {verPantalla === 'verAlumno' && (
                <FormularioVerAlumno
                    alumno={alumnoParaVer}
                    handleVolverAtras={handleVolverAtrasListado}
                />
            )}

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
            {verPantalla === 'editarAlumno' && (

                <FormularioEditarAlumno
                    userState={dataAlumnoEditar}
                    setUserState={setDataAlumnoEditar}
                    handleSubmit={handleSubmit(handleFormularioEditarAlumno)}
                    handleVolverAtras={handleVolverAtrasListado}
                    error={error}
                />


            )}
        </div>

    );
}

export default Subject;
