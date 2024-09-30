import React, { useEffect, useState } from 'react';
import "./Formulario.css";

interface FormularioAlumnoProps {
  userState: any;
  formData: any;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleVolverAtras: () => void;
  error: string;
}

const FormularioAlumno: React.FC<FormularioAlumnoProps> = ({
  userState,
  formData,
  handleInputChange,
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

  return (
    <form className="containerFormulario" onSubmit={handleSubmit}>
      <div className="flecha-atras" onClick={handleVolverAtras}></div>
      <div className="profile-section">
        {profileImage ? (
          <img src={profileImage} alt="Imagen de perfil" className="profile-image" />
        ) : (
          <div className="profile-placeholder">Sin imagen</div>
        )}
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
                <input type="text" name="nombre" value={formData?.nombre} readOnly />
              </td>
            </tr>
            <tr>
              <td>
                <label id="fuenteChiquita" className="separacion3">
                  Primer Apellido:
                </label>
              </td>
              <td>
                <input type="text" name="apellido1" value={formData?.apellido1} readOnly />
              </td>
            </tr>
            <tr>
              <td>
                <label id="fuenteChiquita" className="separacion3">
                  Segundo Apellido:
                </label>
              </td>
              <td>
                <input type="text" name="apellido2" value={formData?.apellido2} readOnly />
              </td>
            </tr>
            <tr>
              <td>
                <label id="fuenteChiquita" className="separacion3">
                  DNI:
                </label>
              </td>
              <td>
                <input type="text" name="dni" value={formData?.dni} readOnly />
              </td>
            </tr>
            <tr>
              <td>
                <label id="fuenteChiquita" className="separacion3">
                  Dirección de correo electrónico:
                </label>
              </td>
              <td>
                <input type="text" name="correoElectronico" value={formData?.correoElectronico} readOnly />
              </td>
            </tr>
            <tr>
              <td>
                <label id="fuenteChiquita" className="separacion3">
                  Número de teléfono:
                </label>
              </td>
              <td>
                <input type="text" name="telefono" value={formData?.telefono} readOnly />
              </td>
            </tr>
            <tr>
              <td>
                <label id="fuenteChiquita" className="separacion3">
                  Domicilio:
                </label>
              </td>
              <td>
                <input type="text" name="direccion" value={formData?.domicilio} readOnly />
              </td>
            </tr>
            <tr>
              <td>
                <label id="fuenteChiquita" className="separacion3">
                  Usuario:
                </label>
              </td>
              <td>
                <input type="text" name="usuario" value={formData?.usuario} readOnly />
              </td>
            </tr>
            <tr>
              <td>
                <label id="fuenteChiquita" className="separacion3">
                  Contraseña actual:
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
      </div >
      {<p id='fuenteChiquita' className="errorMessage">{error}</p>}
      <button type="submit" id="fuenteAsignaturas" className="opcion">Guardar cambios</button>
    </form>
  );

}

export default FormularioAlumno;
