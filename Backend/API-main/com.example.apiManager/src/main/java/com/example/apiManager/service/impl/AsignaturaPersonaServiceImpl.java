
package com.example.apiManager.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.apiManager.entities.Asignatura;
import com.example.apiManager.entities.AsignaturaPersona;
import com.example.apiManager.entities.ExamenPersona;
import com.example.apiManager.entities.pk.AsignaturaPersonaPK;
import com.example.apiManager.entities.pk.ExamenPersonaPK;
import com.example.apiManager.repository.AsignaturaPersonaRepository;
import com.example.apiManager.repository.AsignaturaRepository;
import com.example.apiManager.service.AsignaturaPersonaService;

@Service
public class AsignaturaPersonaServiceImpl implements AsignaturaPersonaService {

	private AsignaturaPersonaRepository repo;

	public AsignaturaPersonaServiceImpl(AsignaturaPersonaRepository repo) {
		this.repo = repo;
	}

	// READ
	@Override
	public List<AsignaturaPersona> findAll() {
		return repo.findAll();
	}

	@Override
	public AsignaturaPersona findById(AsignaturaPersonaPK id) {
		return repo.getReferenceById(id);
	}

	// POST
	@Override
	public boolean postAsignaturaPersona(AsignaturaPersona asignaturaPersona) {
		if (asignaturaPersona != null) {
			repo.save(asignaturaPersona);
			return true;
		}
		return false;
	}

	@Override
	public boolean deleteAsignaturaPersonaById(AsignaturaPersonaPK asignaturaPersonaPK) {
		if(repo.getReferenceById(asignaturaPersonaPK)!=null) {
			repo.deleteById(asignaturaPersonaPK);
			return true;
		}
		return false;
		
	}

	@Override
	public boolean deleteAll() {
		if(repo.findAll().isEmpty()) {
			return false;
		}else {
			repo.deleteAll();
			return true;
		}
	}

	@SuppressWarnings({ "null", "unused" })
	@Override
	public List<AsignaturaPersona> findAsignaturasByIdPersona(String idPersona) {
		List<AsignaturaPersonaPK> listaDevuelve = null;
		List<AsignaturaPersona> listProv = repo.findAll();
		Long idPersonaLong = Long.parseLong(idPersona);
		for(AsignaturaPersona ep : listProv) {
			if(ep.getPersona().getId()==idPersonaLong) {
				listaDevuelve.add(ep.getId());
			}
		}
		
		if(listaDevuelve!=null) {
			return repo.findAllById(listaDevuelve);
		}
		return null;
		
	}

	@SuppressWarnings({ "null", "unused" })
	@Override
	public boolean deleteAllAsignaturasByIdPersona(String idPersona) {
		List<AsignaturaPersonaPK> listaDevuelve = null;
		List<AsignaturaPersona> listProv = repo.findAll();
		Long idPersonaLong = Long.parseLong(idPersona);
		for(AsignaturaPersona ep : listProv) {
			if(ep.getPersona().getId()==idPersonaLong) {
				listaDevuelve.add(ep.getId());
			}
		}
		
		if(listaDevuelve!=null) {
			repo.deleteAllById(listaDevuelve);
			return true;
		}
		return false;
	}

}
