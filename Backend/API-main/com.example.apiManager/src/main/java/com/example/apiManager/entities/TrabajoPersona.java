package com.example.apiManager.entities;

import com.example.apiManager.entities.pk.TrabajoPersonaPK;
import jakarta.persistence.*;

@Entity
@Table(name = "trabajo_persona")
public class TrabajoPersona {

	@EmbeddedId
	private TrabajoPersonaPK id;

	@MapsId("trabajoId")
	@ManyToOne
	private Trabajo trabajo;

	@MapsId("personaId")
	@ManyToOne
	private Persona persona;

	private double calificacion;
	private boolean entregado;

	public TrabajoPersona(Trabajo trabajo, Persona persona, double calificacion, boolean entregado) {
		this.trabajo = trabajo;
		this.persona = persona;
		this.calificacion = calificacion;
		this.entregado = entregado;
	}

	public TrabajoPersona(TrabajoPersonaPK id, Trabajo trabajo, Persona persona, double calificacion,
			boolean entregado) {
		this.id = id;
		this.trabajo = trabajo;
		this.persona = persona;
		this.calificacion = calificacion;
		this.entregado = entregado;
	}
	
	public TrabajoPersona() {}

	public TrabajoPersonaPK getId() {
		return id;
	}

	public void setId(TrabajoPersonaPK id) {
		this.id = id;
	}

	public Trabajo getTrabajo() {
		return trabajo;
	}

	public void setTrabajo(Trabajo trabajo) {
		this.trabajo = trabajo;
	}

	public Persona getPersona() {
		return persona;
	}

	public void setPersona(Persona persona) {
		this.persona = persona;
	}

	public double getCalificacion() {
		return calificacion;
	}

	public void setCalificacion(double calificacion) {
		this.calificacion = calificacion;
	}

	public boolean isEntregado() {
		return entregado;
	}

	public void setEntregado(boolean entregado) {
		this.entregado = entregado;
	}

	@Override
	public String toString() {
		return "TrabajoPersona [id=" + id + ", trabajo=" + trabajo + ", persona=" + persona + ", calificacion="
				+ calificacion + ", entregado=" + entregado + "]";
	}

}
