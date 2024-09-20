package com.example.apiManager.entities;

import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "grado")

public class Grado {

	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String nombre;
	
	public Grado(String nombre) {
		this.nombre = nombre;
	}
	
	public Grado(Long id, String nombre) {
		this.id = id;
		this.nombre = nombre;
	}
	
	@OneToOne(mappedBy = "grado")
	private Horario horario;

	@OneToMany(mappedBy = "grado")
	private List<Persona> personas;

	@OneToMany(mappedBy = "grado")
	private List<Asignatura> asignaturas;

	//Constructor con relaciones
	public Grado(Long id, String nombre, Horario horario, List<Persona> personas,
			List<Asignatura> asignaturas) {
		this.id = id;
		this.nombre = nombre;
		this.horario = horario;
		this.personas = personas;
		this.asignaturas = asignaturas;
	}


	public Grado() {
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

	public List<Persona> getPersonas() {
		return personas;
	}

	public void setPersonas(List<Persona> personas) {
		this.personas = personas;
	}

	public List<Asignatura> getAsignaturas() {
		return asignaturas;
	}

	public void setAsignaturas(List<Asignatura> asignaturas) {
		this.asignaturas = asignaturas;
	}

	@Override
	public String toString() {
		return "Grado [id=" + id + ", nombre=" + nombre + ", horario=" + horario + ", personas=" + personas
				+ ", asignaturas=" + asignaturas + "]";
	}

}
