package com.example.apiManager.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.apiManager.entities.AsignaturaPersona;
import com.example.apiManager.entities.pk.AsignaturaPersonaPK;
import com.example.apiManager.service.AsignaturaPersonaService;

public class AsignaturaPersonaController {

	AsignaturaPersonaService serv;
	
	public AsignaturaPersonaController (AsignaturaPersonaService serv) {
		this.serv = serv;
	}
	
	@GetMapping("/asginaturaPersona")
	public ResponseEntity<String> findAll() {
		List<AsignaturaPersona> listProvis = null;
		listProvis = serv.findAll();
		if(listProvis.isEmpty()) {
			return new ResponseEntity<>("La lista esta vacía",HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>("Se lleno correctamentr",HttpStatus.OK);
	}
	
	@GetMapping("/asginaturaPersona/{id}")
	public ResponseEntity<String> findById(@PathVariable AsignaturaPersonaPK id) {
		AsignaturaPersona asigPersAux = serv.findById(id);
		if(asigPersAux!=null) {
			return new ResponseEntity<>("Se encontró correctamente",HttpStatus.OK);
		}
		return new ResponseEntity<>("No se ha encontrado, id inexistente",HttpStatus.BAD_REQUEST);
	}

	@PostMapping("/asginaturaPersona")
	public ResponseEntity<String> postAsignaturaPersona(@RequestBody AsignaturaPersona asignaturaPersona) {
		if (serv.postAsignaturaPersona(asignaturaPersona)) {
			return new ResponseEntity<>("Se creo con exito",HttpStatus.CREATED);
		}
		return new ResponseEntity<>("mala formulada la petición",HttpStatus.BAD_REQUEST);
	}
	
	@PutMapping("/asignaturaPersona")
	public ResponseEntity<String> updateAsignaturaPersona(@RequestBody AsignaturaPersona asignaturaPersona) {
		if (serv.postAsignaturaPersona(asignaturaPersona)) {
			return new ResponseEntity<>("Se atualizó con exito",HttpStatus.OK);
		}
		return new ResponseEntity<>("mala formulada la petición",HttpStatus.BAD_REQUEST);
	} 

	@DeleteMapping("/asignaturaPersona/{id}")
	public ResponseEntity<String> deleteAsignaturaPersonaById(@PathVariable AsignaturaPersonaPK asignaturaPersonaPK) {
		
		if(serv.deleteAsignaturaPersonaById(asignaturaPersonaPK)) {
			return new ResponseEntity<>("Registro borrado",HttpStatus.OK);
		}
		return new ResponseEntity<>("mala formulada la petición",HttpStatus.BAD_REQUEST);
		
	}

	@DeleteMapping("/asignaturaPersona")
	public ResponseEntity<String> deleteAll() {
		serv.deleteAll();
		return new ResponseEntity<>("Todos los registros se han borrado",HttpStatus.OK);
	}
}
