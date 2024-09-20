package com.example.apiManager.entities;

import java.util.List;
import jakarta.persistence.*;

@Entity
@Table (name = "curso")

public class Curso {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nombre;
	
	@OneToOne (mappedBy = "curso")
	private Horario horario;
	
	@OneToMany(mappedBy = "curso")
	private List<Asignatura> asignaturas;
	
	@OneToMany(mappedBy = "curso")
	private List<Persona> personas;
	
	public Curso() {
		
	}

	public Curso(Long id, String nombre) {
		this.id = id;
		this.nombre = nombre;
	}

	public Curso(Long id, String nombre, Horario horario, List<Asignatura> asignaturas, List<Persona> personas) {
		this.id = id;
		this.nombre = nombre;
		this.horario = horario;
		this.asignaturas = asignaturas;
		this.personas = personas;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Horario getHorario() {
		return horario;
	}

	public void setHorario(Horario horario) {
		this.horario = horario;
	}

	public List<Asignatura> getAsignaturas() {
		return asignaturas;
	}

	public void setAsignaturas(List<Asignatura> asignaturas) {
		this.asignaturas = asignaturas;
	}

	public List<Persona> getPersonas() {
		return personas;
	}

	public void setPersonas(List<Persona> personas) {
		this.personas = personas;
	}
	
}
