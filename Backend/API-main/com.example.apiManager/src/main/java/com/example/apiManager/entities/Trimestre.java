package com.example.apiManager.entities;

import java.util.List;
import jakarta.persistence.*;

@Entity
@Table(name = "trimestre")
public class Trimestre {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nombre;
	
	@OneToMany(mappedBy = "trimestre")
	private List<Examen> examenes;

	@OneToMany(mappedBy = "trimestre")
	private List<Trabajo> trabajos;
	
	public Trimestre() {}

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

	public List<Examen> getExamenes() {
		return examenes;
	}

	public void setExamenes(List<Examen> examenes) {
		this.examenes = examenes;
	}

	public List<Trabajo> getTrabajos() {
		return trabajos;
	}

	public void setTrabajos(List<Trabajo> trabajos) {
		this.trabajos = trabajos;
	}

	@Override
	public String toString() {
		return "Trimestre [id=" + id + ", nombre=" + nombre + ", examenes=" + examenes + ", trabajos=" + trabajos + "]";
	}
}
