package com.example.apiManager.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.apiManager.entities.Asignatura;
import com.example.apiManager.repository.AsignaturaRepository;

@RestController
@RequestMapping("/api")
public class AsignaturaController {

	private AsignaturaRepository repo;

	public AsignaturaController(AsignaturaRepository repo) {
		this.repo = repo;
	}

	@GetMapping("/asignatura")
	public List<Asignatura> findAll() {
		return repo.findAll();
	}

	@GetMapping("/asignatura/{id}")
	public Asignatura getAsignaturaById(@PathVariable String id){
		return repo.getReferenceById(Long.parseLong(id));
	}

	@PostMapping("/asignatura")
	public void  updateAsignatura(@RequestBody Asignatura asignatura) {
		repo.save(asignatura);
	}

	@DeleteMapping("/asignatura/{id}")
	public Asignatura deleteAsignaturaById (@PathVariable String id) {
		Long numAux = Long.parseLong(id);
		Asignatura asignaturaAux = repo.getReferenceById(numAux);
			if(asignaturaAux!=null) {
				repo.deleteById(numAux);
				return asignaturaAux;
			}
		return null;
	}
}

