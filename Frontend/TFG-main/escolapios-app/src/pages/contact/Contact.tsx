import React, { useState } from 'react';
import "./Contact.css";
import axios from 'axios';
import { sendFormulario } from '../../api/auth/formularioContacto';

export const Contact = () => {
  // Definir el estado para cada campo del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    codPostal: '',
    nombreAlumno: '',
    fechaNacimiento: '',
    mensaje: ''
  });

  const handleChange = (e: { target: { id: any; value: any; }; }) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const solicitud = {
      nombre: formData.nombre,
      email: formData.email,
      telefono: formData.telefono,
      codPostal: formData.codPostal,
      nombreAlumno: formData.nombreAlumno,
      fechaNacimiento: formData.fechaNacimiento,
      mensaje: formData.mensaje,
      abierto: false
    };

    sendFormulario(solicitud).then(async (success) => {
      if (success) {
        alert('Se envió correctamente.');
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          codPostal: '',
          nombreAlumno: '',
          fechaNacimiento: '',
          mensaje: ''
        })
      } else {
        const errorMessage = await sendFormulario(solicitud);
        alert('Error al enviar: ' + errorMessage);
      }
    });
  }

    return (
      <section className="get-in-touch">
        <h1 className="title">CONTACTO</h1>
        <form className="contact-form row" onSubmit={handleSubmit}>
          <div className="form-field col x-50">
            <input id="nombre" className="input-text js-input" type="text" value={formData.nombre} onChange={handleChange} required />
            <label className="label" htmlFor="nombre">Nombre del Contacto</label>
          </div>
          <div className="form-field col x-50">
            <input id="email" className="input-text js-input" type="email" value={formData.email} onChange={handleChange} required />
            <label className="label" htmlFor="email">E-mail</label>
          </div>
          <div className="form-field col x-50">
            <input id="telefono" className="input-text js-input" type="text" value={formData.telefono} onChange={handleChange} required />
            <label className="label" htmlFor="telefono">Teléfono</label>
          </div>
          <div className="form-field col x-50">
            <input id="codPostal" className="input-text js-input" type="text" value={formData.codPostal} onChange={handleChange} required />
            <label className="label" htmlFor="codPostal">Código Postal</label>
          </div>
          <div className="form-field col x-50">
            <input id="nombreAlumno" className="input-text js-input" type="text" value={formData.nombreAlumno} onChange={handleChange} required />
            <label className="label" htmlFor="nombreAlumno">Nombre del Alumno</label>
          </div>
          <div className="form-field col x-50">
            <input id="fechaNacimiento" className="input-text js-input" type="date" value={formData.fechaNacimiento} onChange={handleChange} required />
            <label className="label" htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
          </div>
          <div className="form-field col x-100">
            <input id="mensaje" className="input-text js-input" type="text" value={formData.mensaje} onChange={handleChange} required />
            <label className="label" htmlFor="mensaje">Mensaje</label>
          </div>
          <div className="form-field col x-100 align-center">
            <input className="submit-btn" type="submit" value="Enviar" />
            <button className="submit-btn cancel-btn" type="button" onClick={() => window.location.href = '/'}>Cancelar</button>
          </div>
          <div className='background'></div>
        </form>
        <p className="note">Colegio<a className="link" href="https://www.escolapiosdegetafe.es/" target="_blank" rel="noopener noreferrer"> La Inmaculada-Padres Escolapios</a>.</p>
      </section>
    );
  };
  export default Contact;
