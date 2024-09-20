package com.example.apiManager.entities;

import com.example.apiManager.entities.pk.ExamenPersonaPK;
import jakarta.persistence.*;

@Entity
@Table (name = "examen_persona")

public class ExamenPersona {

	@EmbeddedId
	private ExamenPersonaPK id;

	@MapsId("examenId")
	@ManyToOne
	private Examen examen;

	@MapsId("personaId")
	@ManyToOne
	private Persona persona;
	
	private double calificacion;
	private boolean aprobado;
	
	public ExamenPersona(Examen examen, Persona persona, double calificacion, 
			boolean aprobado) {
		this.examen = examen;
		this.persona = persona;
		this.calificacion = calificacion;
		this.aprobado = aprobado;
	}
	
	public ExamenPersona(ExamenPersonaPK id, Examen examen, Persona persona, 
			double calificacion, boolean aprobado) {
		this.id = id;
		this.examen = examen;
		this.persona = persona;
		this.calificacion = calificacion;
		this.aprobado = aprobado;
	}

	public ExamenPersona() {
		
	}

	public ExamenPersonaPK getId() {
		return id;
	}

	public void setId(ExamenPersonaPK id) {
		this.id = id;
	}

	public Examen getExamen() {
		return examen;
	}

	public void setExamen(Examen examen) {
		this.examen = examen;
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

	public boolean isAprobado() {
		return aprobado;
	}

	public void setAprobado(boolean aprobado) {
		this.aprobado = aprobado;
	}

	@Override
	public String toString() {
		return "ExamenPersona [id=" + id + ", examen=" + examen + ", persona=" + persona + ", calificacion="
				+ calificacion + ", aprobado=" + aprobado + "]";
	}
	
}
