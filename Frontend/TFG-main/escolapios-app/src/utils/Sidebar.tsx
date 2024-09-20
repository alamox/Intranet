import "./../pages/subject/Subject.css"
import React from 'react';

interface SidebarPropiedades {
  show: boolean;
  showSettingsOptions: boolean;
  onClickLateral: (opcion: string) => void;
  onClickSettings: (ajuste: string) => void;
  esProfesor: boolean;
}

const Sidebar: React.FC<SidebarPropiedades> = ({ show, showSettingsOptions, onClickLateral, onClickSettings, esProfesor }) => {
  if (!show) return null;
    if (!esProfesor){
        return (
            <nav className="barra-lateral">
              <ul className="navigation">
                <li>
                  <button onClick={() => onClickLateral("Info")} className="opcion" id='fuenteNormal'>Información</button>
                </li>
                <li>
                  <button onClick={() => onClickLateral("Contacto")} className="opcion" id='fuenteNormal'>Contacto</button>
                </li>
                <li>
                  <button onClick={() => onClickLateral("Ajustes")} className="opcion" id='fuenteNormal'>Ajustes</button>
                  {showSettingsOptions && (
                    <ul>
                      <li>
                        <button onClick={() => onClickSettings("cambiarDatos")} className="opcion" id="fuenteChiquita">Cambiar contraseña</button>
                      </li>
                      <li>
                        <button onClick={() => onClickSettings("ajustesPag")} className="opcion" id="fuenteChiquita">Ajustes de la página</button>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <button onClick={() => onClickLateral("CerrarSesion")} className="opcion" id='fuenteNormal'>Cerrar sesión</button>
                </li>
              </ul>
            </nav>
          );
    } else {
        return (
            <nav className="barra-lateral">
                    <ul className="navigation">
                        <li><button onClick={() => onClickLateral("Info")}
                            className="opcion"
                            id='fuenteNormal'>Información</button>
                        </li>
                        <li><button onClick={() => onClickSettings("cambiarDatos")}
                            className="opcion"
                            id='fuenteNormal'>Editar datos</button>
                        </li>
                        <li><button onClick={() => onClickLateral("Ajustes")}
                            className="opcion"
                            id='fuenteNormal'>Editar lista de alumnos</button>
                            {showSettingsOptions && (
                                <ul>
                                    <li><button onClick={() => onClickSettings("addAlumno")}
                                        className="opcion"
                                        id="fuenteChiquita">Añadir</button></li>
                                    <li><button onClick={() => onClickSettings("deleteAlumno")}
                                        className="opcion"
                                        id="fuenteChiquita">Dar de baja o modificar</button></li>
                                </ul>
                            )}
                        </li>
                        <li><button onClick={() => onClickLateral("CerrarSesion")}
                            className="opcion"
                            id='fuenteNormal'>Cerrar sesión</button>
                        </li>
                    </ul>
                </nav>
        )
    }

};

export default Sidebar;
