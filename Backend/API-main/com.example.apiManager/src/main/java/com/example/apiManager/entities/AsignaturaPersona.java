package com.example.apiManager.entities;

import java.util.List;

import com.example.apiManager.entities.pk.AsignaturaPersonaPK;

import jakarta.persistence.*;

@Entity
@Table(name = "asignatura_persona")

public class AsignaturaPersona {

	@EmbeddedId
	private AsignaturaPersonaPK id;
	
	@MapsId("asignaturaId")
	@ManyToOne
	private Asignatura asignatura;

	@MapsId("personaId")
	@ManyToOne
	private Persona persona;

	//matriculado es convalidado para alumnos y para profesores si
	//ese año dan esa asignatura
	
	private boolean matriculado;
	private double calificacion;

	public AsignaturaPersona(Asignatura asignatura, Persona persona, boolean matriculado, double calificacion) {
		this.asignatura = asignatura;
		this.persona = persona;
		this.matriculado = matriculado;
		this.calificacion = calificacion;
	}

	public AsignaturaPersona(AsignaturaPersonaPK id, Asignatura asignatura, Persona persona, boolean matriculado,
			double calificacion) {
		this.id = id;
		this.asignatura = asignatura;
		this.persona = persona;
		this.matriculado = matriculado;
		this.calificacion = calificacion;
	}

	public AsignaturaPersona(boolean matriculado, double calificacion) {
		this.matriculado = matriculado;
		this.calificacion = calificacion;
	}

	@OneToMany(mappedBy = "asignaturaPersona")
	private List<Asistencia> asistencias;

	@OneToMany(mappedBy = "asignaturaPersona")
	private List<Foro> foros;

	public AsignaturaPersona(AsignaturaPersonaPK id, Asignatura asignatura, Persona persona, boolean matriculado,
			double calificacion, List<Asistencia> asistencias, List<Foro> foros) {
		this.id = id;
		this.asignatura = asignatura;
		this.persona = persona;
		this.matriculado = matriculado;
		this.calificacion = calificacion;
		this.asistencias = asistencias;
		this.foros = foros;
	}

	public AsignaturaPersona() {
	}

	public AsignaturaPersonaPK getId() {
		return id;
	}

	public void setId(AsignaturaPersonaPK id) {
		this.id = id;
	}

	public Asignatura getAsignatura() {
		return asignatura;
	}

	public void setAsignatura(Asignatura asignatura) {
		this.asignatura = asignatura;
	}

	public Persona getPersona() {
		return persona;
	}

	public void setPersona(Persona persona) {
		this.persona = persona;
	}

	public boolean isMatriculado() {
		return matriculado;
	}

	public void setMatriculado(boolean matriculado) {
		this.matriculado = matriculado;
	}

	public double getCalificacion() {
		return calificacion;
	}

	public void setCalificacion(double calificacion) {
		this.calificacion = calificacion;
	}

	public List<Asistencia> getAsistencias() {
		return asistencias;
	}

	public void setAsistencias(List<Asistencia> asistencias) {
		this.asistencias = asistencias;
	}

	public List<Foro> getForos() {
		return foros;
	}

	public void setForos(List<Foro> foros) {
		this.foros = foros;
	}

	@Override
	public String toString() {
		return "AsignaturaPersona [id=" + id + ", asignatura=" + asignatura + ", persona=" + persona + ", matriculado="
				+ matriculado + ", calificacion=" + calificacion + ", asistencias=" + asistencias + ", foros=" + foros
				+ "]";
	}

}
