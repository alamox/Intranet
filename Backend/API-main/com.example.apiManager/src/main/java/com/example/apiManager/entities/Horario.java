package com.example.apiManager.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "horario")

public class Horario {

	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column (nullable = false)
	private String dia;
	
	@Column (nullable = false)
	private String hora;
	
	@Column (name = "nombre_asignatura", nullable = false)
	private String nombreAsignatura;
	
	public Horario(String dia, String hora, String nombreAsignatura, Grado grado) {
		this.dia = dia;
		this.hora = hora;
		this.nombreAsignatura = nombreAsignatura;
		this.grado = grado;
	}
	
	public Horario(Long id, String dia, String hora, String nombreAsignatura) {
		this.id = id;
		this.dia = dia;
		this.hora = hora;
		this.nombreAsignatura = nombreAsignatura;
	}

	@OneToOne 
	private Grado grado;
	
	@OneToOne 
	private Curso curso;

	public Horario(Long id, String dia, String hora, String nombreAsignatura, Grado grado,
			Curso curso) {
		this.id = id;
		this.dia = dia;
		this.hora = hora;
		this.nombreAsignatura = nombreAsignatura;
		this.grado = grado;
		this.curso = curso;
	}
	
	public Horario() {}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDia() {
		return dia;
	}

	public void setDia(String dia) {
		this.dia = dia;
	}

	public String getHora() {
		return hora;
	}

	public void setHora(String hora) {
		this.hora = hora;
	}

	public String getNombreAsignatura() {
		return nombreAsignatura;
	}

	public void setNombreAsignatura(String nombreAsignatura) {
		this.nombreAsignatura = nombreAsignatura;
	}

	public Grado getGrado() {
		return grado;
	}

	public void setGrado(Grado grado) {
		this.grado = grado;
	}

	public Curso getCurso() {
		return curso;
	}

	public void setCurso(Curso curso) {
		this.curso = curso;
	}

	@Override
	public String toString() {
		return "Horario [id=" + id + ", dia=" + dia + ", hora=" + hora + ", nombreAsignatura=" + nombreAsignatura
				+ ", grado=" + grado + ", curso=" + curso + "]";
	}
	
}
