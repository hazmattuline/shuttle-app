package rest.models.response;

public class ShuttleResponse {
  private Integer vehicleID;
  private String name;
  private String status;
  private Double latitudeCoordinates;
  private Double longitudeCoordinates;

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

  public Integer getVehicleID() {
    return vehicleID;
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

  public void setVehicleID(Integer vehicleID) {
    this.vehicleID = vehicleID;
  }
}
