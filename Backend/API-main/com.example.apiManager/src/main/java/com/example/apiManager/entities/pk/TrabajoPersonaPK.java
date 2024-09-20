package com.example.apiManager.entities.pk;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.*;

@Embeddable
public class TrabajoPersonaPK implements Serializable{

	@Column (name = "trabajo_id")
	private Long trabajoId;
	
	@Column (name = "persona_id")
	private Long personaId;

	public TrabajoPersonaPK() {
	}

	public TrabajoPersonaPK(Long trabajoId, Long personaId) {
		this.trabajoId = trabajoId;
		this.personaId = personaId;
	}

	public Long getTrabajoId() {
		return trabajoId;
	}

	public void setTrabajoId(Long trabajoId) {
		this.trabajoId = trabajoId;
	}

	public Long getPersonaId() {
		return personaId;
	}

	public void setPersonaId(Long personaId) {
		this.personaId = personaId;
	}

	@Override
	public int hashCode() {
		return Objects.hash(personaId, trabajoId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TrabajoPersonaPK other = (TrabajoPersonaPK) obj;
		return Objects.equals(personaId, other.personaId) && Objects.equals(trabajoId, other.trabajoId);
	}

}
