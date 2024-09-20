import React, { useEffect, useState } from 'react';
import "./Formulario.css";

interface FormularioVerAlumnoProps {
  alumno: any;
  handleVolverAtras: () => void;
}

const FormularioVerAlumno: React.FC<FormularioVerAlumnoProps> = ({ alumno, handleVolverAtras }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    if (alumno?.foto) {
      setProfileImage(`data:image/jpeg;base64,${alumno.foto}`);
    } else {
      setProfileImage(null);
    }
  }, [alumno]);

  return (
    <div className="containerFormulario">
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
              <td><label id="fuenteChiquita" className="separacion3 normal">Nombre:</label></td>
              <td><span>{alumno.nombre}</span></td>
            </tr>
            <tr>
              <td><label id="fuenteChiquita" className="separacion3">Primer Apellido:</label></td>
              <td><span>{alumno.apellido1}</span></td>
            </tr>
            <tr>
              <td><label id="fuenteChiquita" className="separacion3">Segundo Apellido:</label></td>
              <td><span>{alumno.apellido2}</span></td>
            </tr>
            <tr>
              <td><label id="fuenteChiquita" className="separacion3">DNI:</label></td>
              <td><span>{alumno.dni}</span></td>
            </tr>
            <tr>
              <td><label id="fuenteChiquita" className="separacion3">Correo Electrónico:</label></td>
              <td><span>{alumno.correoElectronico}</span></td>
            </tr>
            <tr>
              <td><label id="fuenteChiquita" className="separacion3">Teléfono:</label></td>
              <td><span>{alumno.telefono}</span></td>
            </tr>
            <tr>
              <td><label id="fuenteChiquita" className="separacion3">Domicilio:</label></td>
              <td><span>{alumno.domicilio}</span></td>
            </tr>
            <tr>
              <td><label id="fuenteChiquita" className="separacion3">Usuario:</label></td>
              <td><span>{alumno.usuario}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormularioVerAlumno;
