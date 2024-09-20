import React, { ChangeEvent, useEffect, useState } from 'react';
import "./Formulario.css";
import imageCompression from 'browser-image-compression';

interface FormularioProfesorProps {
    userState: any;
    setUserState: React.Dispatch<React.SetStateAction<any>>;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleVolverAtras: () => void;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error: string;
}

const FormularioProfesor: React.FC<FormularioProfesorProps> = ({
    userState,
    setUserState,
    handleInputChange,
    handleSubmit,
    handleVolverAtras,
    handleFileChange,
    error,
}) => {
    const [profileImage, setProfileImage] = useState<string | null>(null);

    const handleFileChange1 = async (e: ChangeEvent<HTMLInputElement>) => {
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

                 setUserState((prevState: any) => ({
                     ...prevState,
                     foto: fotoArray,
                 }));
            } catch (error) {
                console.error('Error al comprimir la imagen:', error);
            }
        }
    };
    
    useEffect(() => {
        setUserState(userState);
        if (userState?.foto) {
            setProfileImage(`data:image/jpeg;base64,${userState.foto}`);
        } else {
            setProfileImage(null);
        }
    }, [userState]);

    const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.replace(/\D/g, '');
        const limitedInput = input.slice(0, 9);
        setUserState((prevState: any) => ({
            ...prevState,
            telefono: limitedInput,
        }));
    };

    return (
        <form className="containerFormulario" onSubmit={handleSubmit}>
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
                                <label id="fuenteChiquita" className="separacion2 normal">
                                    Nombre:
                                </label>
                            </td>
                            <td>
                                <input type="text" name="nombre" value={userState?.nombre} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label id="fuenteChiquita" className="separacion3">
                                    Primer Apellido:
                                </label>
                            </td>
                            <td>
                                <input type="text" name="apellido1" value={userState?.apellido1} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label id="fuenteChiquita" className="separacion3">
                                    Segundo Apellido:
                                </label>
                            </td>
                            <td>
                                <input type="text" name="apellido2" value={userState?.apellido2} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label id="fuenteChiquita" className="separacion3">
                                    DNI:
                                </label>
                            </td>
                            <td>
                                <input type="text" name="dni" value={userState?.dni} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label id="fuenteChiquita" className="separacion3">
                                    Dirección de correo electrónico:
                                </label>
                            </td>
                            <td>
                                <input type="text" name="correoElectronico" value={userState?.correoElectronico} onChange={handleInputChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label id="fuenteChiquita" className="separacion3">
                                    Número de teléfono:
                                </label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="telefono"
                                    value={userState?.telefono || ''}
                                    onChange={handleTelefonoChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label id="fuenteChiquita" className="separacion3">
                                    Domicilio:
                                </label>
                            </td>
                            <td>
                                <input type="text" name="domicilio" value={userState?.domicilio} onChange={handleInputChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label id="fuenteChiquita" className="separacion3">
                                    Usuario:
                                </label>
                            </td>
                            <td>
                                <input type="text" name="usuario" value={userState?.usuario} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label id="fuenteChiquita" className="separacion3">
                                    Contraseña actual para confirmar cambios:
                                </label>
                            </td>
                            <td>
                                <input type="password" name="contrasenaActual" onChange={handleInputChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label id="fuenteChiquita" className="separacion3">
                                    Contraseña nueva:
                                </label>
                            </td>
                            <td>
                                <input type="password" name="contrasenaNueva" onChange={handleInputChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label id="fuenteChiquita" className="separacion3">
                                    Confirmar nueva contraseña:
                                </label>
                            </td>
                            <td>
                                <input type="password" name="confirmarContrasena" onChange={handleInputChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {<p id="fuenteChiquita" className="errorMessage">{error}</p>}
            <button type="submit" id="fuenteAsignaturas" className="opcion">Guardar cambios</button>
        </form>
    );
};

export default FormularioProfesor;
