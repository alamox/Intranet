import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaCheckCircle, FaUserAlt } from 'react-icons/fa';
import axios from 'axios';
import { updateContacto } from '../api/auth/formularioContacto';
import { MdEmail } from 'react-icons/md';
import { FaRegMessage } from 'react-icons/fa6';
import { FiPhoneCall } from 'react-icons/fi';

interface ContactItemProps {
    contacto: Formulario;
    expanded: boolean;
    onExpand: (id: number) => void;
}

const FormulariosContacto: React.FC<ContactItemProps> = ({ contacto, expanded, onExpand }) => {
    const handleExpandClick = () => {
        if (!expanded && !contacto.abierto) {
            updateContacto(contacto.id!.toString(), { ...contacto, abierto: true })
                .then(() => {
                    onExpand(contacto.id!);
                })
                .catch(err => console.error('Error updating contact:', err));
        } else {
            onExpand(contacto.id!);
        }
    };

    return (
        <div
            className={`contact-item ${expanded ? 'expanded' : ''}`}
            onClick={handleExpandClick}
        >
            <div className="contact-summary">
                <p><strong><FaUserAlt />&nbsp;</strong> {contacto.nombre}</p>
                {!expanded && (
                    <div className="contact-status">
                        {contacto.abierto ? (
                            <FaCheckCircle className="status-icon read" />
                        ) : (
                            <FaExclamationTriangle className="status-icon unread" />
                        )}
                    </div>
                )}
            </div>
            {expanded && (
                <div className="contact-details">
                    <p><strong><MdEmail />&nbsp;</strong> {contacto.email}</p>
                    <p><strong><FaRegMessage />&nbsp;</strong> {contacto.mensaje}</p>
                    <p><strong><FiPhoneCall />&nbsp;</strong> {contacto.telefono}</p>
                </div>
            )}
        </div>
    );
};

export default FormulariosContacto;
