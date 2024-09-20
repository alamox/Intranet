package com.example.apiManager.entities.pk;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.*;

@Embeddable
public class ExamenPersonaPK implements Serializable{

	@Column (name = "examen_id")
	private Long examenId;
	
	@Column (name = "persona_id")
	private Long personaId;

	public ExamenPersonaPK() {
	}

	public ExamenPersonaPK(Long examenId, Long personaId) {
		this.examenId = examenId;
		this.personaId = personaId;
	}

	public void setExamenId(Long examenId) {
		this.examenId = examenId;
	}

	public void setPersonaId(Long personaId) {
		this.personaId = personaId;
	}

	@Override
	public String toString() {
		return "ExamenPersonaPK [examenId=" + examenId + ", personaId=" + personaId + "]";
	}

	@Override
	public int hashCode() {
		return Objects.hash(examenId, personaId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ExamenPersonaPK other = (ExamenPersonaPK) obj;
		return Objects.equals(examenId, other.examenId) && Objects.equals(personaId, other.personaId);
	}	

}
