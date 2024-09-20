package com.example.apiManager.controller;

import java.net.MalformedURLException;
import java.util.List;
import java.util.Optional;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.example.apiManager.repository.PersonaRepository;
import com.example.apiManager.service.PersonaService;
import com.example.apiManager.service.UploadFileService;
import com.example.apiManager.entities.*;

@RestController
@RequestMapping("/api")
public class PersonaController {

	private PersonaService serv;
	private UploadFileService uploadFileService;

	public PersonaController(PersonaService serv, UploadFileService u) {
		this.serv = serv;
		uploadFileService = u;

	}

	// http://localhost:4810/api/alumnos

	@GetMapping("/personas")
	public ResponseEntity<List<Persona>> findAll() {
		List<Persona> personas = serv.findAll();
		if(personas!=null) {
			return new ResponseEntity<>(personas, HttpStatus.OK);
		}
		return new ResponseEntity<>(personas, HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/personas/alumnos")
	public ResponseEntity<List<Persona>> findAllAlumnos() {
		List<Persona> alumnos = serv.findAllAlumnos();

		if(alumnos!=null) {
			return new ResponseEntity<>(alumnos, HttpStatus.OK);
		}
		return new ResponseEntity<>(alumnos, HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/personas/profes")
	public ResponseEntity<List<Persona>> findAllProfesores() {
		List<Persona> profes = serv.findAllProfesores();

		if(profes!=null) {
			return new ResponseEntity<>(profes, HttpStatus.OK);
		}
		return new ResponseEntity<>(profes, HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/persona/{id}")
	public ResponseEntity<Persona> findPersonaById(@PathVariable String id) {
		Persona personaAux = serv.findPersonaById(id);
		if(personaAux!=null) {
			return new ResponseEntity<>(personaAux, HttpStatus.OK);
		}
		return new ResponseEntity<>(personaAux, HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/login/usuario/contraseña")
	public ResponseEntity<Long> login(@RequestBody String usuario, @RequestBody String contraseña) {
		Long id = serv.findIdByUsuarioAndConstraseña(usuario, contraseña);
		Persona personaAux = serv.findPersonaById(id.toString());
		if(personaAux!=null) {
			return new ResponseEntity<>(id, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
	}

	@PutMapping("/persona")
	public ResponseEntity<String> updatePersona(@RequestBody Persona persona) {
		if(serv.updatePersona(persona)) {
			return ResponseEntity.ok("Todo fue bien");
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al actaulizar Persona");
	}

	@DeleteMapping("/personas/{id}")
	public ResponseEntity<String> deletePersonaById(@PathVariable String id) {
		if(serv.deletePersonaById(id)) {
			return ResponseEntity.ok("Se eliminó correctamente");
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No se pudo formular la petición");
		
	}

	@DeleteMapping("/personas/{idGrado}")
	public ResponseEntity<String> deleteAllAlumnosGrado(@PathVariable String idGrado) {
		if(serv.deleteAllAlumnosGrado(idGrado)) {
			return ResponseEntity.ok("Se eliminó correctamente");
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No se pudo formular la petición");
	}

	@PutMapping("/persona/alumno/{id}")
	public ResponseEntity<String> cambiarContrasena(@PathVariable String id, @RequestParam String nuevaContrasena) {
		try {
			Persona personaAux = serv.findPersonaById(id);

			if (personaAux == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No existe el user");
			} else {
				personaAux.setContraseña(nuevaContrasena);
				return ResponseEntity.ok("Todo ha ido de locos.");
			}
		} catch (NumberFormatException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ID no válido");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar la contraseña");
		}
	}

	// para cargar las fotos

	@GetMapping(value = "uploads/{filename}")
	public ResponseEntity<Resource> goImage(@PathVariable String filename) {
		Resource resource = null;
		try {
			resource = uploadFileService.load(filename);
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);
	}

}
