package com.example.apiManager.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.apiManager.entities.Horario;

@Service
public interface HorarioService {

	//READ
	List<Horario> getHorarioByIdGradoIdCurso(String idGrado, String idCurso);
	List<Horario> findAll();
	Horario findHorarioById(String id);
	//POST
	boolean postHorario (Horario horario);

	//DELETE
	boolean deleteHorarioByIdGradoIdCurso (String idGrado, String idCurso);
	boolean deleteAllHorario();
}
