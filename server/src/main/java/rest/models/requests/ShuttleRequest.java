package rest.models.requests;

public class ShuttleRequest {
	private Integer vehicleId;
	private Double latitudeCoordinates;
	private Double longitudeCoordinates;
	private String status;

	public Double getLatitudeCoordinates() {
		return latitudeCoordinates;
	}
	public Double getLongitudeCoordinates() {
		return longitudeCoordinates;
	}
	public String getStatus() {
		return status;
	}
	public Integer getVehicleId() {
		return vehicleId;
	}
	public void setLatitudeCoordinates(Double latitudeCoordinates) {
		this.latitudeCoordinates = latitudeCoordinates;
	}
	public void setLongitudeCoordinates(Double longitudeCoordinates) {
		this.longitudeCoordinates = longitudeCoordinates;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public void setVehicleId(Integer vehicleId) {
		this.vehicleId = vehicleId;
	}
}
