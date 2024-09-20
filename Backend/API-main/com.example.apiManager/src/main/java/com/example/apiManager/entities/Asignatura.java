package com.example.apiManager.entities;

import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "asignatura")
public class Asignatura {

	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private Long id;

	private String nombre;

	private String temario;

	private String descripcion;
	
	private String horas;

	public Asignatura(String nombre, String temario, String descripcion) {
		this.nombre = nombre;
		this.temario = temario;
		this.descripcion = descripcion;
	}

	public Asignatura(Long id, String nombre, String temario, String descripcion) {
		this.id = id;
		this.nombre = nombre;
		this.temario = temario;
		this.descripcion = descripcion;
	}

	@OneToMany(mappedBy = "asignatura")
	private List<Examen> examenes;

	@OneToMany(mappedBy = "asignatura")
	private List<Trabajo> trabajos;

	@OneToMany(mappedBy = "asignatura")
	private List<AsignaturaPersona> asignaturaPersonas;

	@ManyToOne
	private Grado grado;
	
	@ManyToOne
	private Curso curso;

	public Asignatura(Long id, String nombre, String temario, String descripcion, List<Examen> examenes,
			List<Trabajo> trabajos, List<AsignaturaPersona> asignaturaPersonas, Grado grado, Curso curso) {
		this.id = id;
		this.nombre = nombre;
		this.temario = temario;
		this.descripcion = descripcion;
		this.examenes = examenes;
		this.trabajos = trabajos;
		this.asignaturaPersonas = asignaturaPersonas;
		this.grado = grado;
		this.curso = curso;
	}

	public Asignatura() {
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

	public String getTemario() {
		return temario;
	}

	public void setTemario(String temario) {
		this.temario = temario;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getHoras() {
		return horas;
	}

	public void setHoras(String horas) {
		this.horas = horas;
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

	public List<AsignaturaPersona> getAsignaturaPersonas() {
		return asignaturaPersonas;
	}

	public void setAsignaturaPersonas(List<AsignaturaPersona> asignaturaPersonas) {
		this.asignaturaPersonas = asignaturaPersonas;
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
		return "Asignatura [id=" + id + ", nombre=" + nombre + ", temario=" + temario + ", descripcion=" + descripcion
				+ ", horas=" + horas + ", examenes=" + examenes + ", trabajos=" + trabajos + ", asignaturaPersonas="
				+ asignaturaPersonas + ", grado=" + grado + ", curso=" + curso + "]";
	}

}
