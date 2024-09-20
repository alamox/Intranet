package com.example.apiManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.apiManager.entities.Asignatura;
import com.example.apiManager.entities.AsignaturaPersona;
import com.example.apiManager.entities.pk.AsignaturaPersonaPK;

@Repository
public interface AsignaturaPersonaRepository extends JpaRepository<AsignaturaPersona, AsignaturaPersonaPK>{

}
