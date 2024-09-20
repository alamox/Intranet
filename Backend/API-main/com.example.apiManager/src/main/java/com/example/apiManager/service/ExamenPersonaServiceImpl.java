package com.example.apiManager.service;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;

import com.example.apiManager.entities.ExamenPersona;
import com.example.apiManager.entities.pk.ExamenPersonaPK;
import com.example.apiManager.repository.ExamenPersonaRepository;

public class ExamenPersonaServiceImpl implements ExamenPersonaService{
	
	ExamenPersonaRepository repo;
	
	public ExamenPersonaServiceImpl (ExamenPersonaRepository repo){
		this.repo=repo;
	}

	@Override
	public List<ExamenPersona> findAll() {
		return repo.findAll();
	}

	@Override
	public ExamenPersona findById(ExamenPersonaPK id) {
		return repo.getReferenceById(id);
	}

	@Override
	public ExamenPersona postExamenPersona(ExamenPersona examenPersona) {
		return repo.save(examenPersona);
	}

	@Override
	public boolean deleteExamenPersonaById(ExamenPersonaPK id) {
		if(repo.getReferenceById(id)!=null) {
			return true;
		}
		return false;
	}

	@Override
	public boolean deleteAllExamenPersona() {
		if(repo.findAll().isEmpty()) {
			return false;
		}else {
			repo.deleteAll();
			return true;
		}

	}

	@Override
	public List<ExamenPersona> findAllExamenByIdPersona(String idPersona) {
		List<ExamenPersona> listaDevuelve = null;
		List<ExamenPersona> listProv = repo.findAll();
		Long idPersonaLong = Long.parseLong(idPersona);
		for(ExamenPersona ep : listProv) {
			if(ep.getPersona().getId()==idPersonaLong) {
				listaDevuelve.add(ep);
			}
		}
		return listaDevuelve;
	}

	@Override
	public boolean deleteAllExamenByIdPersona(String idPersona) {
		List<ExamenPersonaPK> listaDevuelve = null;
		List<ExamenPersona> listProv = repo.findAll();
		Long idPersonaLong = Long.parseLong(idPersona);
		for(ExamenPersona ep : listProv) {
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
