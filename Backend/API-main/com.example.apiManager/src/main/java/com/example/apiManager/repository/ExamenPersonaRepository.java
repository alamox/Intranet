package com.example.apiManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.apiManager.entities.ExamenPersona;
import com.example.apiManager.entities.pk.ExamenPersonaPK;
@Repository
public interface ExamenPersonaRepository extends JpaRepository<ExamenPersona, ExamenPersonaPK>{

}
