interface Login {
    username: string;
    password: string;
}

interface User {

    id: string;
    nombre: string;
    apellido1: string;
    apellido2: string;
    dni: string;
    correoElectronico: string;
	fechaNac: Date;
    domicilio: string;
    usuario: string;
    contraseña: string;
    esProfe: boolean;
    telefono: string;
    idCurso?: number;
    idGrado?: number;
    foto?: number[];

}


interface UserSinID {
    nombre: string;
    apellido1: string;
    apellido2: string;
    dni: string;
    correoElectronico: string;
	fechaNac: Date;
    domicilio: string;
    usuario: string;
    contraseña: string;
    esProfe: boolean;
    telefono: string;
    cursoId?: number;
    gradoId?: number;
    foto?: number[];
}

interface Password {
    id: string;
    contraseña: string;
}

interface Subject {
    id: number;
    descripcion: string;
    horaTotal: number;
    nombre: string;
    temario: string;
    curso_id: number;
    grado_id: number;
}

interface AsignaturaPersonaPK {
    asignaturaId: number;
    personaId: number;
}

interface SubjectPerson {
    id: {
        idAsignatura,
        idPersona
    };
    asignatura: Subject;
    persona: User;
    matriculado: boolean;
    calificacion1?: number;
    calificacion2?: number;
    calificacion3?: number;
    calificacionOrd?: number;
    calificacionExtra?: number;
    asistencias: Asistencia[];
    idAsignatura: number;
    idPersona: number;
}

interface Asistencia {
    id?: number;
    justificada: boolean;
    motivo?: string;
    fecha?: string;
    hora?: string;
}

interface FaltaAsistencia {
    id: number;
    nombre?: string;
    apellidos?: string;
    esProfe?: boolean;
    falta: boolean;
    faltaJustificada: boolean;
    idAsignatura: number;
    fechaFalta?: Date;
  }

  interface Curso {
    id: number;
    nombre: string;
  }

  interface Grado {
    id: number;
    nombre: string;
  }

  interface Archivo {
    id?: number;
    nombre: string;
    instrucciones?: string;
    datos?: number[];
    tipo?: string;
    fechaSubida?: string;
    fechaEntrega?: string;
    nombreArchivo?: string;
    tipoArchivo?: string;
  }

  interface ArchivoPersona {
    id: ArchivoPersonaPK;
    datos?: number[];
    personaId?: string;
    calificacion: number;
	entregado: boolean;
    archivo: Archivo;
    persona: User;
    idArchivo?: number;
    idPersona?: number;
    nombreArchivo: string;
  }

  interface ArchivoPersonaPK {
    archivoId: string;
    personaId: string;
  }

  interface Formulario {
    id?: number;
    nombre: string;
    email: string;
    telefono: string;
    codPostal: string;
    mensaje: string;
    abierto: boolean;
  }

  interface Horario {
    cursoId: number;
    gradoId: number;
    dia: string;
    hora: string;
    nombreAsignatura: string;
  }