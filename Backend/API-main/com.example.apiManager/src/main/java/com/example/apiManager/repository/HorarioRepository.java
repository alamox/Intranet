package com.example.apiManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.apiManager.entities.Horario;
@Repository
public interface HorarioRepository extends JpaRepository<Horario, Long>{

}
