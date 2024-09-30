import React, { ChangeEvent, useEffect, useState } from 'react';
import imageCompression from 'browser-image-compression';
import "./Formulario.css";

interface FormularioEditarAlumnoProps {
  userState: any;
  setUserState: React.Dispatch<React.SetStateAction<any>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleVolverAtras: () => void;
  error: string;
}

const FormularioEditarAlumno: React.FC<FormularioEditarAlumnoProps> = ({
  userState,
  setUserState,
  handleSubmit,
  handleVolverAtras,
  error,
}) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    if (userState?.foto) {
      setProfileImage(`data:image/jpeg;base64,${userState.foto}`);
    } else {
      console.log('No se encontró imagen de perfil');
      setProfileImage(null);
    }
  }, [userState]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserState((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
                <input type="text" name="nombre" value={userState?.nombre} onChange={handleInputChange} />
              </td>
            </tr>
            <tr>
              <td>
                <label id="fuenteChiquita" className="separacion3">
                  Primer Apellido:
                </label>
              </td>
              <td>
                <input type="text" name="apellido1" value={userState?.apellido1} onChange={handleInputChange} />
              </td>
            </tr>
            <tr>
              <td>
                <label id="fuenteChiquita" className="separacion3">
                  Segundo Apellido:
                </label>
              </td>
              <td>
                <input type="text" name="apellido2" value={userState?.apellido2} onChange={handleInputChange} />
              </td>
            </tr>
            <tr>
              <td>
                <label id="fuenteChiquita" className="separacion3">
                  DNI:
                </label>
              </td>
              <td>
                <input type="text" name="dni" value={userState?.dni} onChange={handleInputChange} />
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
                <input type="text" name="telefono" value={userState?.telefono} onChange={handleInputChange} />
              </td>
            </tr>
            <tr>
              <td>
                <label id="fuenteChiquita" className="separacion3">
                  Domicilio:
                </label>
              </td>
              <td>
                <input type="text" name="direccion" value={userState?.domicilio} onChange={handleInputChange} />
              </td>
            </tr>
            <tr>
              <td>
                <label id="fuenteChiquita" className="separacion3">
                  Usuario:
                </label>
              </td>
              <td>
                <input type="text" name="usuario" value={userState?.usuario} onChange={handleInputChange} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {<p id='fuenteChiquita' className="errorMessage">{error}</p>}
      <button type="submit" id="fuenteAsignaturas" className="opcion">Guardar cambios</button>
    </form>
  );
};

export default FormularioEditarAlumno;
