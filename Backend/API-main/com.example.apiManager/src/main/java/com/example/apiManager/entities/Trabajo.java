package com.example.apiManager.entities;

import java.time.LocalDate;
import java.util.List;
import jakarta.persistence.*;

@Entity
@Table(name = "trabajo")
public class Trabajo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nombre;
	private String instrucciones;

	@Column(name = "fecha_subida")
	private LocalDate fechaSubida;
	@Column(name = "fecha_entrega")
	private LocalDate fechaEntrega;

	public Trabajo(String nombre, String instrucciones, LocalDate fechaSubida, 
			LocalDate fechaEntrega) {
		this.nombre = nombre;
		this.instrucciones = instrucciones;
		this.fechaSubida = fechaSubida;
		this.fechaEntrega = fechaEntrega;
	}

	public Trabajo(Long id, String nombre, String instrucciones, 
			LocalDate fechaSubida, LocalDate fechaEntrega) {
		this.id = id;
		this.nombre = nombre;
		this.instrucciones = instrucciones;
		this.fechaSubida = fechaSubida;
		this.fechaEntrega = fechaEntrega;
	}

	@ManyToOne
	private Asignatura asignatura;
	
	@ManyToOne
	private Trimestre trimestre;

	@OneToMany (mappedBy = "trabajo")
	private List<TrabajoPersona> trabajosPersona;

	public Trabajo(Long id, String nombre, String instrucciones, LocalDate fechaSubida, LocalDate fechaEntrega,
			Asignatura asignatura, Trimestre trimestre, List<TrabajoPersona> trabajosPersona) {
		this.id = id;
		this.nombre = nombre;
		this.instrucciones = instrucciones;
		this.fechaSubida = fechaSubida;
		this.fechaEntrega = fechaEntrega;
		this.asignatura = asignatura;
		this.trimestre = trimestre;
		this.trabajosPersona = trabajosPersona;
	}
	
	public Trabajo() {}

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

	public String getInstrucciones() {
		return instrucciones;
	}

	public void setInstrucciones(String instrucciones) {
		this.instrucciones = instrucciones;
	}

	public LocalDate getFechaSubida() {
		return fechaSubida;
	}

	public void setFechaSubida(LocalDate fechaSubida) {
		this.fechaSubida = fechaSubida;
	}

	public LocalDate getFechaEntrega() {
		return fechaEntrega;
	}

	public void setFechaEntrega(LocalDate fechaEntrega) {
		this.fechaEntrega = fechaEntrega;
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

	public List<TrabajoPersona> getTrabajosPersona() {
		return trabajosPersona;
	}

	public void setTrabajosPersona(List<TrabajoPersona> trabajosPersona) {
		this.trabajosPersona = trabajosPersona;
	}

	@Override
	public String toString() {
		return "Trabajo [id=" + id + ", nombre=" + nombre + ", instrucciones=" + instrucciones + ", fechaSubida="
				+ fechaSubida + ", fechaEntrega=" + fechaEntrega + ", asignatura=" + asignatura + ", trimestre="
				+ trimestre + ", trabajosPersona=" + trabajosPersona + "]";
	}
}
