package rest.models.response;

public class ShuttleResponse {
	private Integer id;
	private String name;
	private String status;
	private Double latitudeCoordinates;
	private Double longitudeCoordinates;

	public Integer getId() {
		return id;
	}

	public Double getLatitudeCoordinates() {
		return latitudeCoordinates;
	}

	public Double getLongitudeCoordinates() {
		return longitudeCoordinates;
	}

	public String getName() {
		return name;
	}

	public String getStatus() {
		return status;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setLatitudeCoordinates(Double latitudeCoordinates) {
		this.latitudeCoordinates = latitudeCoordinates;
	}

	public void setLongitudeCoordinates(Double longitudeCoordinates) {
		this.longitudeCoordinates = longitudeCoordinates;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
