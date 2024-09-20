package com.example.apiManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.apiManager.entities.Asignatura;
@Repository
public interface AsignaturaRepository extends JpaRepository<Asignatura, Long>{

}
