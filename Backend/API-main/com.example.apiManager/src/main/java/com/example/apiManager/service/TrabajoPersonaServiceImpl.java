package com.example.apiManager.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.apiManager.entities.ExamenPersona;
import com.example.apiManager.entities.Horario;
import com.example.apiManager.entities.TrabajoPersona;
import com.example.apiManager.entities.pk.ExamenPersonaPK;
import com.example.apiManager.entities.pk.TrabajoPersonaPK;
import com.example.apiManager.repository.TrabajoPersonaRepository;

public class TrabajoPersonaServiceImpl implements TrabajoPersonaService {

	TrabajoPersonaRepository repo;

	public TrabajoPersonaServiceImpl(TrabajoPersonaRepository repo) {
		this.repo = repo;
	}

	@Override
	public List<TrabajoPersona> findAll() {
		return repo.findAll();
	}

	@Override
	public TrabajoPersona findById(TrabajoPersonaPK id) {
		return repo.getReferenceById(id);
	}

	@Override
	public List<TrabajoPersona> findAllTrabajosByIdPersona(String idPersona) {
		List<TrabajoPersonaPK> listaDevuelve = null;
		List<TrabajoPersona> listProv = repo.findAll();
		Long idPersonaLong = Long.parseLong(idPersona);
		for (TrabajoPersona ep : listProv) {
			if (ep.getPersona().getId() == idPersonaLong) {
				listaDevuelve.add(ep.getId());
			}
		}
		return repo.findAllById(listaDevuelve);
	}

	@Override
	public boolean postTrabajoPersona(TrabajoPersona trabajoPersona) {
		TrabajoPersona trabajoPersAux = repo.save(trabajoPersona);
		if(trabajoPersAux!=null) {
			return true;
		}
		return false;
	}

	@Override
	public boolean deleteTrabajoPersonaById(TrabajoPersonaPK id) {
		TrabajoPersona trabajoPersonaAux = repo.getReferenceById(id);
		if(trabajoPersonaAux!=null) {
			repo.deleteById(id);
			return true;
		}
		return false;
	}

	@Override
	public boolean deleteAllTrabajosPersona() {
		if(repo.findAll().isEmpty()) {
			return false;
		}else {
			repo.deleteAll();
			return true;
		}

	}

	@Override
	public boolean deleteAllTrabajosByIdPersona(String idPersona) {
		List<TrabajoPersonaPK> listaDevuelve = null;
		List<TrabajoPersona> listProv = repo.findAll();
		Long idPersonaLong = Long.parseLong(idPersona);
		for (TrabajoPersona ep : listProv) {
			if (ep.getPersona().getId() == idPersonaLong) {
				listaDevuelve.add(ep.getId());
			}
		}

		if (listaDevuelve != null) {
			repo.deleteAllById(listaDevuelve);
			return true;
		}
		return false;
	}
}
