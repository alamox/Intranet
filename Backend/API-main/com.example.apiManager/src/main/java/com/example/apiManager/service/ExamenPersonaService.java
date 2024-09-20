package com.example.apiManager.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.apiManager.entities.Asignatura;
import com.example.apiManager.entities.ExamenPersona;
import com.example.apiManager.entities.TrabajoPersona;
import com.example.apiManager.entities.pk.ExamenPersonaPK;

@Service
public interface ExamenPersonaService {
	//READ
	List<ExamenPersona> findAll();
	ExamenPersona findById(ExamenPersonaPK id);
	List<ExamenPersona> findAllExamenByIdPersona(String id);
	//POST
	ExamenPersona postExamenPersona (ExamenPersona examenPersona);
	//DELETE
	boolean deleteExamenPersonaById(ExamenPersonaPK id);
	boolean deleteAllExamenPersona ();
	boolean deleteAllExamenByIdPersona(String id);
	
	}
