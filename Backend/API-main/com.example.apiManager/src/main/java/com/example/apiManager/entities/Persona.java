package com.example.apiManager.entities;

import java.time.LocalDate;
import java.util.List;
import jakarta.persistence.*;

@Entity
@Table(name = "persona")
public class Persona {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String nombre;

	@Column(name = "apellido_1")
	private String apellido1;

	@Column(name = "apellido_2")
	private String apellido2;

	@Column(length = 9) // 8 números y 1 letra
	private String DNI;

	@Column(name = "correo_electronico")
	private String correoElectronico;

	@Column(name = "fecha_nac")
	private LocalDate fechaNac; // (yyyy-mm-dd)

	private String domicilio;

	@Column(unique = true)
	private String usuario;

	private String contraseña;

	private boolean esProfe; // por default sería false
	
	private String foto;

	// Constructor sin ID
	public Persona(String nombre, String apellido1, String apellido2, String dNI, String correoElectronico,
			LocalDate fechaNac, String domicilio, String usuario, String contraseña, boolean esProfe, String foto) {
		this.nombre = nombre;
		this.apellido1 = apellido1;
		this.apellido2 = apellido2;
		DNI = dNI;
		this.correoElectronico = correoElectronico;
		this.fechaNac = fechaNac;
		this.domicilio = domicilio;
		this.usuario = usuario;
		this.contraseña = contraseña;
		this.esProfe = esProfe;
		this.foto = foto;
	}

	// Constructor con ID
	public Persona(Long id, String nombre, String apellido1, String apellido2, String dNI, String correoElec,
			LocalDate fechaNac, String domicilio, String usuario, String contraseña, boolean esProfe,
			String foto) {
		this.id = id;
		this.nombre = nombre;
		this.apellido1 = apellido1;
		this.apellido2 = apellido2;
		DNI = dNI;
		correoElectronico = correoElec;
		this.fechaNac = fechaNac;
		this.domicilio = domicilio;
		this.usuario = usuario;
		this.contraseña = contraseña;
		this.esProfe = esProfe;
		this.foto = foto;
	}

	@ManyToOne
	private Grado grado;

	@ManyToOne
	private Curso curso;

	@OneToMany(mappedBy = "persona")
	private List<AsignaturaPersona> asignaturasPersona;

	@OneToMany(mappedBy = "persona")
	private List<ExamenPersona> examenesPersona;

	@OneToMany(mappedBy = "persona")
	private List<TrabajoPersona> trabajosPersona;

	public Persona(Long id, String nombre, String apellido1, String apellido2, String dNI, String correoElectronico,
			LocalDate fechaNac, String domicilio, String usuario, String contraseña, boolean esProfe, String foto, Grado grado,
			List<AsignaturaPersona> asignaturasPersona, List<ExamenPersona> examenesPersona,
			List<TrabajoPersona> trabajosPersona, Curso curso) {
		this.id = id;
		this.nombre = nombre;
		this.apellido1 = apellido1;
		this.apellido2 = apellido2;
		DNI = dNI;
		this.correoElectronico = correoElectronico;
		this.fechaNac = fechaNac;
		this.domicilio = domicilio;
		this.usuario = usuario;
		this.contraseña = contraseña;
		this.esProfe = esProfe;
		this.foto = foto;
		this.grado = grado;
		this.asignaturasPersona = asignaturasPersona;
		this.examenesPersona = examenesPersona;
		this.trabajosPersona = trabajosPersona;
		this.curso = curso;
	}
	
	public Persona() {}

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

	public String getApellido1() {
		return apellido1;
	}

	public void setApellido1(String apellido1) {
		this.apellido1 = apellido1;
	}

	public String getApellido2() {
		return apellido2;
	}

	public void setApellido2(String apellido2) {
		this.apellido2 = apellido2;
	}

	public String getDNI() {
		return DNI;
	}

	public void setDNI(String dNI) {
		DNI = dNI;
	}

	public String getCorreoElectronico() {
		return correoElectronico;
	}

	public void setCorreoElectronico(String correoElectronico) {
		this.correoElectronico = correoElectronico;
	}

	public LocalDate getFechaNac() {
		return fechaNac;
	}

	public void setFechaNac(LocalDate fechaNac) {
		this.fechaNac = fechaNac;
	}

	public String getDomicilio() {
		return domicilio;
	}

	public void setDomicilio(String domicilio) {
		this.domicilio = domicilio;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getContraseña() {
		return contraseña;
	}

	public void setContraseña(String contraseña) {
		this.contraseña = contraseña;
	}

	public boolean isEsProfe() {
		return esProfe;
	}

	public void setEsProfe(boolean esProfe) {
		this.esProfe = esProfe;
	}

	public String getFoto() {
		return foto;
	}

	public void setFoto(String foto) {
		this.foto = foto;
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

	public List<AsignaturaPersona> getAsignaturasPersona() {
		return asignaturasPersona;
	}

	public void setAsignaturasPersona(List<AsignaturaPersona> asignaturasPersona) {
		this.asignaturasPersona = asignaturasPersona;
	}

	public List<ExamenPersona> getExamenesPersona() {
		return examenesPersona;
	}

	public void setExamenesPersona(List<ExamenPersona> examenesPersona) {
		this.examenesPersona = examenesPersona;
	}

	public List<TrabajoPersona> getTrabajosPersona() {
		return trabajosPersona;
	}

	public void setTrabajosPersona(List<TrabajoPersona> trabajosPersona) {
		this.trabajosPersona = trabajosPersona;
	}

	@Override
	public String toString() {
		return "Persona [id=" + id + ", nombre=" + nombre + ", apellido1=" + apellido1 + ", apellido2=" + apellido2
				+ ", DNI=" + DNI + ", correoElectronico=" + correoElectronico + ", fechaNac=" + fechaNac
				+ ", domicilio=" + domicilio + ", usuario=" + usuario + ", contraseña=" + contraseña + ", esProfe="
				+ esProfe + ", foto=" + foto + ", grado=" + grado + ", curso=" + curso + ", asignaturasPersona="
				+ asignaturasPersona + ", examenesPersona=" + examenesPersona + ", trabajosPersona=" + trabajosPersona
				+ "]";
	}

}
