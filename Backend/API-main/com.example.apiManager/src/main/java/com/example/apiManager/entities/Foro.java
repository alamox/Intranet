package com.example.apiManager.entities;

import java.util.Date;
import jakarta.persistence.*;

@Entity
@Table(name = "foro")
public class Foro {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String mensaje;
	private Date fecha;

	public Foro(String mensaje, Date fecha) {
		this.mensaje = mensaje;
		this.fecha = fecha;
	}

	public Foro(Long id, String mensaje, Date fecha) {
		this.id = id;
		this.mensaje = mensaje;
		this.fecha = fecha;
	}

	@ManyToOne
	private AsignaturaPersona asignaturaPersona;

	public Foro(Long id, String mensaje, Date fecha, AsignaturaPersona asignaturaPersona) {
		this.id = id;
		this.mensaje = mensaje;
		this.fecha = fecha;
		this.asignaturaPersona = asignaturaPersona;
	}
	public Foro() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMensaje() {
		return mensaje;
	}

	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public AsignaturaPersona getAsignaturaPersona() {
		return asignaturaPersona;
	}

	public void setAsignaturaPersona(AsignaturaPersona asignaturaPersona) {
		this.asignaturaPersona = asignaturaPersona;
	}

	@Override
	public String toString() {
		return "Foro [id=" + id + ", mensaje=" + mensaje + ", fecha=" + fecha + ", asignaturaPersona="
				+ asignaturaPersona + "]";
	}
}
