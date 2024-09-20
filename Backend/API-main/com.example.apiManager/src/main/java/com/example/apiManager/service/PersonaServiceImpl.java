package com.example.apiManager.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.apiManager.entities.Persona;
import com.example.apiManager.repository.PersonaRepository;

@Service
public class PersonaServiceImpl implements PersonaService {

	PersonaRepository repo;
	
	public PersonaServiceImpl(PersonaRepository repo) {
		this.repo = repo;
	}

	@Override
	public List<Persona> findAll() {
		return repo.findAll();
	}

	@SuppressWarnings("null")
	@Override
	public List<Persona> findAlumnos() {
		List<Persona> personas = repo.findAll();
		List<Long> alumnos = null;
		for (Persona p : personas) {
			if (!p.isEsProfe()) {
				alumnos.add(p.getId());
			}
		}
		if(alumnos.isEmpty()) {
			return null;
		}
		return repo.findAllById(alumnos);
	}

	@Override
	public List<Persona> findProfes() {
		List<Persona> personas = repo.findAll();
		List<Long> profes = null;
		for (Persona p : personas) {
			if (p.isEsProfe()) {
				profes.add(p.getId());
			}
		}
		if(profes.isEmpty()) {
			return null;
		}
		return repo.findAllById(profes);
	}

	@Override
	public Persona findPersonaById(String id) {
		return repo.getReferenceById(Long.parseLong(id));
	}

	@Override
	public boolean updatePersona(Persona persona) {
		if(persona!=null) {
			repo.save(persona);
			return true;
		}
		return false;
	}

	@Override
	public boolean deletePersonaById(String id) {
		if(repo.getReferenceById(Long.parseLong(id))!=null) {
			repo.deleteById(Long.parseLong(id));
			return true;
		}
		return false;
		
	}

	@Override
	public boolean deleteAllAlumnosGrado(String idGrado) {
		List<Persona> personasAux = repo.findAll();
		List<Long> idsAlumnos = null;
		for(Persona p : personasAux) {
			if(p.getGrado().getId()==Long.parseLong(idGrado)) {
				idsAlumnos.add(p.getId());
			}
		}
		if(idsAlumnos.isEmpty()) {
			return false;
		}else {
			repo.deleteAllById(idsAlumnos);
			return true;
		}
	}

	@Override
	public Long login(String usuario, String contraseña) {
		List<Persona> personas = repo.findAll();
		for(Persona p : personas) {
			if((p.getUsuario().equals(usuario)) && (p.getContraseña().equals(contraseña))) {
				return p.getId();
			}
		}
		return null;
	}

}
