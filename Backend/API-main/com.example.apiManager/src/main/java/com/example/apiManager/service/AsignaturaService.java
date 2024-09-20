package com.example.apiManager.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.apiManager.entities.Asignatura;

@Service
public interface AsignaturaService {
	//READ
	List<Asignatura> findAll();
	List<Asignatura> findAsignaturaById(String id);

	//POST&UPDATE
	boolean postAsignatura(Asignatura asignatura);

	//DELETE
	boolean deleteAsignaturaById(String id);
	boolean deleteAllAsignaturas ();
	}


