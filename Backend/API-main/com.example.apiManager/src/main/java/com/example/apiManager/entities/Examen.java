package com.example.apiManager.entities;

import java.time.LocalDate;
import java.util.List;
import jakarta.persistence.*;

@Entity
@Table(name = "examen")
public class Examen {

	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private Long id;
	private String nombre;
	private LocalDate fecha;
	
	public Examen(String nombre, LocalDate fecha) {
		this.nombre = nombre;
		this.fecha = fecha;
	}
	
	public Examen(Long id, String nombre, LocalDate fecha) {
		this.id = id;
		this.nombre = nombre;
		this.fecha = fecha;
	}

	@ManyToOne
	private Asignatura asignatura;
	
	@ManyToOne
	private Trimestre trimestre;
	
	@OneToMany (mappedBy = "examen")
	private List<ExamenPersona>  examenesPersona;

	public Examen(Long id, String nombre, LocalDate fecha, Asignatura asignatura, 
			Trimestre trimestre, List<ExamenPersona> examenesPersona) {
		this.id = id;
		this.nombre = nombre;
		this.fecha = fecha;
		this.asignatura = asignatura;
		this.trimestre = trimestre;
		this.examenesPersona = examenesPersona;
	}
	
	public Examen() {
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

	public LocalDate getFecha() {
		return fecha;
	}

	public void setFecha(LocalDate fecha) {
		this.fecha = fecha;
	}

	public Asignatura getAsignatura() {
		return asignatura;
	}

	public void setAsignatura(Asignatura asignatura) {
		this.asignatura = asignatura;
	}

	public Trimestre getTrimestre() {
		return trimestre;
	}

	public void setTrimestre(Trimestre trimestre) {
		this.trimestre = trimestre;
	}

	public List<ExamenPersona> getExamenesPersona() {
		return examenesPersona;
	}

	public void setExamenesPersona(List<ExamenPersona> examenesPersona) {
		this.examenesPersona = examenesPersona;
	}

	@Override
	public String toString() {
		return "Examen [id=" + id + ", nombre=" + nombre + ", fecha=" + fecha + ", asignatura=" + asignatura
				+ ", trimestre=" + trimestre + ", examenesPersona=" + examenesPersona + "]";
	}
	
}
