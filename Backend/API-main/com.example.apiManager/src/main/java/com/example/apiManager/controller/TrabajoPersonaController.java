package com.example.apiManager.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.apiManager.entities.ExamenPersona;
import com.example.apiManager.entities.TrabajoPersona;
import com.example.apiManager.entities.pk.ExamenPersonaPK;
import com.example.apiManager.entities.pk.TrabajoPersonaPK;
import com.example.apiManager.service.ExamenPersonaService;
import com.example.apiManager.service.TrabajoPersonaService;

public class TrabajoPersonaController {

TrabajoPersonaService serv;
	
	public TrabajoPersonaController (TrabajoPersonaService serv) {
		this.serv = serv;
	}
	
	@GetMapping("/trabajosPersonas")
	public ResponseEntity<String> findAll() {
		if(serv.findAll()!=null) {
			return new ResponseEntity<>("Se encontró correctamente",HttpStatus.OK);
		}
		return new ResponseEntity<>("No se encontró nada", HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/trabajoPersona/{id}")
	public ResponseEntity<String> findById(@PathVariable TrabajoPersonaPK id) {
		if(serv.findById(id)!=null) {
			return new ResponseEntity<>("Se encontró correctamente",HttpStatus.OK);
		}
		return new ResponseEntity<>("No se encontró nada",HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/trabajoPersona/persona/{idPersona}")
	public ResponseEntity<String> findAllTrabajoByIdPersona(@PathVariable String idPersona) {
		if(serv.findAllTrabajosByIdPersona(idPersona)!=null) {
			return new ResponseEntity<>("Se encontraron correctamente",HttpStatus.OK);
		}
		return new ResponseEntity<>("No se eliminaron",HttpStatus.BAD_REQUEST);
	}

	@PostMapping("/trabajoPersona")
	public ResponseEntity<String> postTrabajoPersona(@RequestBody TrabajoPersona trabajoPersona) {
		if(serv.postTrabajoPersona(trabajoPersona)) {
			return new ResponseEntity<>("Se creó correctamente",HttpStatus.CREATED);
		}
		return new ResponseEntity<>("Fallo en la creación",HttpStatus.BAD_REQUEST);
	}
	
	@PutMapping("/trabajoPersona")
	public ResponseEntity<String> updateTrabajoPersona(@RequestBody TrabajoPersona trabajoPersona) {
		if(serv.postTrabajoPersona(trabajoPersona)) {
			return new ResponseEntity<>("Se actualizó correctamente",HttpStatus.CREATED);
		}
		return new ResponseEntity<>("No se pudo actualizar, datos invalidos",HttpStatus.BAD_REQUEST);
	}

	@DeleteMapping("/trabajoPersona/{id}")
	public ResponseEntity<String> deleteTrabajoPersonaById(@PathVariable TrabajoPersonaPK id) {
		if(serv.deleteTrabajoPersonaById(id)) {
			return new ResponseEntity<>("Se eliminó correctamente",HttpStatus.OK);
		}
		return new ResponseEntity<>("No se eliminó",HttpStatus.BAD_REQUEST);
	}


	@DeleteMapping("/trabajoPersona")
	public ResponseEntity<String> deleteAllTrabajoPersona() {
		if(serv.deleteAllTrabajosPersona()) {
			return new ResponseEntity<>("Se eliminarón correctamente",HttpStatus.OK);
		}
		return new ResponseEntity<>("No se eliminó",HttpStatus.BAD_REQUEST);
	}

	@DeleteMapping("/trabajoPersona/persona/{idPersona}")
	public ResponseEntity<String> deleteAllTrabajoByIdPersona(@PathVariable String idPersona) {
		if(serv.deleteAllTrabajosByIdPersona(idPersona)) {
			return new ResponseEntity<>("Se eliminaron correctamente",HttpStatus.OK);
		}
		return new ResponseEntity<>("No se eliminaron",HttpStatus.BAD_REQUEST);
	}
}
