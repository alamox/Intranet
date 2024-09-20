package com.example.apiManager.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.apiManager.entities.ExamenPersona;
import com.example.apiManager.entities.pk.ExamenPersonaPK;
import com.example.apiManager.service.ExamenPersonaService;

public class ExamenPersonaController {

	ExamenPersonaService serv;
	
	public ExamenPersonaController (ExamenPersonaService serv) {
		this.serv = serv;
	}
	
	@GetMapping("/examenesPersonas")
	public ResponseEntity<String> findAll() {
		if(serv.findAll()!=null) {
			return new ResponseEntity<>("Se encontró correctamente",HttpStatus.OK);
		}
		return new ResponseEntity<>("No se encontró nada", HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/examenPersona/{id}")
	public ResponseEntity<String> findById(@PathVariable ExamenPersonaPK id) {
		if(serv.findById(id)!=null) {
			return new ResponseEntity<>("Se encontró correctamente",HttpStatus.OK);
		}
		return new ResponseEntity<>("No se encontró nada",HttpStatus.BAD_REQUEST);
	}

	@PostMapping("/examenPersona")
	public ResponseEntity<String> postExamenPersona(@RequestBody ExamenPersona examenPersona) {
		if(serv.postExamenPersona(examenPersona)!=null) {
			return new ResponseEntity<>("Se creó correctamente",HttpStatus.CREATED);
		}
		return new ResponseEntity<>("Fallo en la creación",HttpStatus.BAD_REQUEST);
	}

	@DeleteMapping("/examenPersona/{id}")
	public ResponseEntity<String> deleteExamenPersonaById(@PathVariable ExamenPersonaPK id) {
		if(serv.deleteExamenPersonaById(id)) {
			return new ResponseEntity<>("Se eliminó correctamente",HttpStatus.OK);
		}
		return new ResponseEntity<>("No se eliminó",HttpStatus.BAD_REQUEST);
	}


	@DeleteMapping("/examenPersona")
	public ResponseEntity<String> deleteAllExamenPersona() {
		if(serv.deleteAllExamenPersona()) {
			return new ResponseEntity<>("Se eliminarón correctamente",HttpStatus.OK);
		}
		return new ResponseEntity<>("No se eliminó",HttpStatus.BAD_REQUEST);
	}


	@GetMapping("/examenPersona/persona/{idPersona}")
	public ResponseEntity<String> findAllExamenByIdPersona(@PathVariable String idPersona) {
		if(serv.findAllExamenByIdPersona(idPersona)!=null) {
			return new ResponseEntity<>("Se encontraron correctamente",HttpStatus.OK);
		}
		return new ResponseEntity<>("No se eliminaron",HttpStatus.BAD_REQUEST);
	}

	@DeleteMapping("/examenPersona/persona/{idPersona}")
	public ResponseEntity<String> deleteAllExamenByIdPersona(@PathVariable String idPersona) {
		if(serv.deleteAllExamenByIdPersona(idPersona)) {
			return new ResponseEntity<>("Se eliminaron correctamente",HttpStatus.OK);
		}
		return new ResponseEntity<>("No se eliminaron",HttpStatus.BAD_REQUEST);
	}
}
