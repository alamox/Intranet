package com.example.apiManager.service;

import java.io.IOException;

import java.net.MalformedURLException;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.apiManager.entities.Persona;

@Service
public interface PersonaService {

	//READ
	List<Persona> findAll () ;
	List<Persona> findAllAlumnos();
	List<Persona> findAllProfesores();

	Persona findPersonaById (String id);
	
	//UPDATE (todos los campos se pueden actualizar
	boolean updatePersona (Persona persona);
	
	//DELETE
	boolean deletePersonaById (String id);
	boolean deleteAllAlumnosGrado (String idGrado);
	
	//OTRAS CONSULTAS
	
	//es el login
	Long findIdByUsuarioAndConstraseña(String usuario, String contraseña);

	
	
}
