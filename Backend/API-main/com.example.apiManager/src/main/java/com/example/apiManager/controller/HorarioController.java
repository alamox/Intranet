package com.example.apiManager.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.apiManager.entities.Horario;
import com.example.apiManager.repository.HorarioRepository;

@RestController
@RequestMapping("/api")
public class HorarioController {

	private HorarioRepository repo;

	public HorarioController(HorarioRepository repo) {
		this.repo = repo;
	}

	@GetMapping("/horario")
	public List<Horario> findAll(){
		return repo.findAll();
	}

	@GetMapping("/horario/idGrado/{idGrado}/idCurso/{idCurso}")
	public List<Horario> getHorarioByIdGradoIdCurso(@PathVariable String idGrado, @PathVariable String idCurso){
		Long idGradoLong=Long.parseLong(idGrado);
		Long idCursoLong=Long.parseLong(idCurso);
		List<Horario> listaHorario = repo.findAll();
		List<Horario> listaProvisional=null;

		for (Horario h : listaHorario) {
			if((h.getGrado().getId() == idGradoLong) && (h.getCurso().getId() == idCursoLong)){
				listaProvisional.add(h);
			}
		}
		return listaProvisional;
	}

	@GetMapping("/horairo/{id}")
	public Horario getHorarioById(@PathVariable String id) {
		return repo.getReferenceById(Long.parseLong(id));
	}
	
	@PostMapping("/horario")
	public Horario createHorario(Horario horario) {
		return repo.save(horario);
	}

	@PutMapping("/horario/{id}")
	public boolean updateHorario(@RequestBody Horario horario, @PathVariable String id){
		if(horario!=null) {
			repo.save(horario);
			return true;
		}
		return false;
		
	}
	
	@DeleteMapping ("/horario/{id}")
	public boolean deleteHorarioById(@PathVariable String id) {
		Horario horarioAux = repo.getReferenceById(Long.parseLong(id));
		if(horarioAux != null) {
			repo.deleteById(Long.parseLong(id));
			return true;
		}
		return false;
	}
	
	//Eliminar un horario de un grado y curso concreto
	
	@DeleteMapping ("/horario/idGrado/{idGrado}/idCurso/{idCurso}")
	public boolean deleteHorarioByIdGradoIdCurso(@PathVariable String idGrado, @PathVariable String idCurso) {
		Long idGradoLong=Long.parseLong(idGrado);
		Long idCursoLong=Long.parseLong(idCurso);
		List<Horario> listaHorario = repo.findAll();
		List<Long> idsHorarios=null;

		for (Horario h : listaHorario) {
			if((h.getGrado().getId() == idGradoLong) && (h.getCurso().getId() == idCursoLong)){
				idsHorarios.add(h.getId());
			}
		}
		
		if(idsHorarios.isEmpty()) {
			return false;
		}else {
			repo.deleteAllById(idsHorarios);
			return true;
		}
	}
}



