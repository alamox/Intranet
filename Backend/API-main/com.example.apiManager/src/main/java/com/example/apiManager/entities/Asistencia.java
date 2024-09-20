package com.example.apiManager.entities;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
@Table(name = "asistencia")

public class Asistencia {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private boolean justificada;
	private String motivo;
	private LocalDate fecha;
	private String hora;

	public Asistencia(boolean justificada, String motivo, LocalDate fecha, String hora) {
		this.justificada = justificada;
		this.motivo = motivo;
		this.fecha = fecha;
		this.hora = hora;
	}

	public Asistencia(Long id, boolean justificada, String motivo, LocalDate fecha, 
			String hora) {
		this.id = id;
		this.justificada = justificada;
		this.motivo = motivo;
		this.fecha = fecha;
		this.hora = hora;
	}

	@ManyToOne 
	private AsignaturaPersona asignaturaPersona;

	public Asistencia(Long id, boolean justificada, String motivo, LocalDate fecha, 
			String hora, AsignaturaPersona asignaturaPersona) {
		this.id = id;
		this.justificada = justificada;
		this.motivo = motivo;
		this.fecha = fecha;
		this.hora = hora;
		this.asignaturaPersona = asignaturaPersona;
	}
	public Asistencia() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public boolean isJustificada() {
		return justificada;
	}

	public void setJustificada(boolean justificada) {
		this.justificada = justificada;
	}

	public String getMotivo() {
		return motivo;
	}

	public void setMotivo(String motivo) {
		this.motivo = motivo;
	}

	public LocalDate getFecha() {
		return fecha;
	}

	public void setFecha(LocalDate fecha) {
		this.fecha = fecha;
	}

	public String getHora() {
		return hora;
	}

	public void setHora(String hora) {
		this.hora = hora;
	}

	public AsignaturaPersona getAsignaturaPersona() {
		return asignaturaPersona;
	}

	public void setAsignaturaPersona(AsignaturaPersona asignaturaPersona) {
		this.asignaturaPersona = asignaturaPersona;
	}

	@Override
	public String toString() {
		return "Asistencia [id=" + id + ", justificada=" + justificada + ", motivo=" + motivo + ", fecha=" + fecha
				+ ", hora=" + hora + ", asignaturaPersona=" + asignaturaPersona + "]";
	}

}
