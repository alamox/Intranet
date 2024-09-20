package com.example.apiManager.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.apiManager.entities.Asignatura;
import com.example.apiManager.entities.AsignaturaPersona;
import com.example.apiManager.entities.TrabajoPersona;
import com.example.apiManager.entities.pk.AsignaturaPersonaPK;

@Service
public interface AsignaturaPersonaService {
	//READ
	List<AsignaturaPersona> findAll();
	AsignaturaPersona findById(AsignaturaPersonaPK asignaturaPersonaPK);
	List<AsignaturaPersona> findAsignaturasByIdPersona (String idPersona);
	//POST&UPDATE
	boolean postAsignaturaPersona (AsignaturaPersona asignaturaPersona);
	//DELETE
	boolean deleteAsignaturaPersonaById(AsignaturaPersonaPK asignaturaPersonaPK);
	boolean deleteAll();
	boolean deleteAllAsignaturasByIdPersona (String idPersona);
	
	}
