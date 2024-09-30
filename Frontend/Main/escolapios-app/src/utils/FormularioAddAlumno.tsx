import React, { ChangeEvent, useState } from 'react';
import imageCompression from 'browser-image-compression';
import "./Formulario.css";

interface FormularioAddAlumnoProps {
    setFormData: React.Dispatch<React.SetStateAction<any>>;
    handleFormularioAddAlumno: (event: React.FormEvent<HTMLFormElement>) => void;
    handleVolverAtras: () => void;
    cursos: Curso[];
    grados: Grado[];
    error: string;
}

const FormularioAddAlumno: React.FC<FormularioAddAlumnoProps> = ({
    setFormData,
    handleFormularioAddAlumno,
    handleVolverAtras,
    cursos,
    grados,
    error,
}) => {

    const [profileImage, setProfileImage] = useState<string | null>(null);

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
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

                setProfileImage(`data:image/jpeg;base64,${base64String}`);

                const fotoArray: number[] = Array.from(byteArray);

                setFormData((prevState: any) => ({
                    ...prevState,
                    foto: fotoArray,
                }));
            } catch (error) {
                console.error('Error al comprimir la imagen:', error);
            }
        }
    };

    return (
        <form className="containerFormularioAdd" onSubmit={handleFormularioAddAlumno}>
            <div className="flecha-atras" onClick={handleVolverAtras}></div>
            <div className="profile-section">
                {profileImage ? (
                    <img src={profileImage} alt="Imagen de perfil" className="profile-image" />
                ) : (
                    <div className="profile-placeholder">Sin imagen</div>
                )}
                <input type="file" name="imagenPerfil" onChange={handleFileChange} />
            </div>
            <div className="datos">
                <table className="custom-table2">
                <tbody>
                            <tr>
                                <td>
                                    <label id="fuenteChiquita" className="separacion normal">
                                        Nombre:
                                    </label>
                                </td>
                                <td>
                                    <input type="text" name="nombre" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label id="fuenteChiquita" className="separacion3">
                                        Primer Apellido:
                                    </label>
                                </td>
                                <td>
                                    <input type="text" name="apellido1" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label id="fuenteChiquita" className="separacion3">
                                        Segundo Apellido:
                                    </label>
                                </td>
                                <td>
                                    <input type="text" name="apellido2" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label id="fuenteChiquita" className="separacion3">
                                        DNI:
                                    </label>
                                </td>
                                <td>
                                    <input type="text" name="dni" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label id="fuenteChiquita" className="separacion3">
                                        Fecha de Nacimiento:
                                    </label>
                                </td>
                                <td>
                                    <input type="date" name="fechaNac" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label id="fuenteChiquita" className="separacion3">
                                        Número de teléfono:
                                    </label>
                                </td>
                                <td>
                                    <input type="text" name="telefono" onChange={(e) => {
                                        const input = e.target.value.replace(/\D/g, '');
                                        const limitedInput = input.slice(0, 9);
                                        setFormData((prevState: any) => ({ ...prevState, telefono: limitedInput }));
                                    }} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label id="fuenteChiquita" className="separacion3">
                                        Domicilio:
                                    </label>
                                </td>
                                <td>
                                    <input type="text" name="direccion" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label id="fuenteChiquita" className="separacion3">
                                        Curso:
                                    </label>
                                </td>
                                <td>
                                    <select name="cursoId">
                                        <option value="">Seleccione un curso</option>
                                        {cursos.map((curso: Curso) => (
                                            <option key={curso.id} value={curso.id}>{curso.nombre}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label id="fuenteChiquita" className="separacion3">
                                        Grado:
                                    </label>
                                </td>
                                <td>
                                    <select name="gradoId">
                                        <option value="">Seleccione un grado</option>
                                        {grados.map((grado: Grado) => (
                                            <option key={grado.id} value={grado.id}>{grado.nombre}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                </table>
            </div>
            <p id="fuenteChiquita" className="errorMessage">{error}</p>
            <button type="submit" id="fuenteAsignaturas" className="opcion">
                Añadir nuevo alumno
            </button>
        </form>
    );
};

export default FormularioAddAlumno;
