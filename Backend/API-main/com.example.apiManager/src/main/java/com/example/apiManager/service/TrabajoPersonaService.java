package com.example.apiManager.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.apiManager.entities.Asignatura;
import com.example.apiManager.entities.Horario;
import com.example.apiManager.entities.TrabajoPersona;
import com.example.apiManager.entities.pk.TrabajoPersonaPK;

@Service
public interface TrabajoPersonaService {
	//READ
	List<TrabajoPersona> findAll();
	TrabajoPersona findById(TrabajoPersonaPK id);
	List<TrabajoPersona> findAllTrabajosByIdPersona(String idPersona);
	
	//POST&UPDATE
	boolean postTrabajoPersona (TrabajoPersona trabajoPersona);
	
	//DELETE
	boolean deleteTrabajoPersonaById(TrabajoPersonaPK id);
	boolean deleteAllTrabajosPersona ();
	boolean deleteAllTrabajosByIdPersona(String idPersona);
	}
