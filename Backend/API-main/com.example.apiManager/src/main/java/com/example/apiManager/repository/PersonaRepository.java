package com.example.apiManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.apiManager.entities.Persona;

@Repository
public interface PersonaRepository extends JpaRepository<Persona, Long>{

	Long findIdByUsuarioAndConstraseña(String usuario, String contraseña);

}
