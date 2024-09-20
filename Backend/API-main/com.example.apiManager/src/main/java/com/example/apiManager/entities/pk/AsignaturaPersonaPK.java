package com.example.apiManager.entities.pk;

import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.*;

//la ID de la tabla intermedia entre Asignatura y Persona (no es entitty)

@Embeddable
public class AsignaturaPersonaPK implements Serializable{
	
	@Column (name = "asignatura_id")
	private Long asignaturaId;
	
	@Column (name = "persona_id")
	private Long personaId;

	public AsignaturaPersonaPK() {}

	public AsignaturaPersonaPK(Long asignaturaId, Long personaId) {
		this.asignaturaId = asignaturaId;
		this.personaId = personaId;
	}

	public void setAsignaturaId(Long asignaturaId) {
		this.asignaturaId = asignaturaId;
	}

	public void setPersonaId(Long personaId) {
		this.personaId = personaId;
	}

	@Override
	public int hashCode() {
		return Objects.hash(asignaturaId, personaId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		AsignaturaPersonaPK other = (AsignaturaPersonaPK) obj;
		return Objects.equals(asignaturaId, other.asignaturaId) && Objects.equals(personaId, other.personaId);
	}

}
