package rest.models.requests;

public class CoordinateRequest {

  private Double latitudeCoordinates;
  private Double longitudeCoordinates;
  private Integer vehicleID;

  public Double getLatitudeCoordinates() {
    return latitudeCoordinates;
  }

  public Double getLongitudeCoordinates() {
    return longitudeCoordinates;
  }

  public Integer getvehicleID() {
    return vehicleID;
  }

  public void setLatitudeCoordinates(Double latitudeCoordinates) {
    this.latitudeCoordinates = latitudeCoordinates;
  }

  public void setLongitudeCoordinates(Double longitudeCoordinates) {
    this.longitudeCoordinates = longitudeCoordinates;
  }

  public void setVehicleID(Integer vehicleID) {
    this.vehicleID = vehicleID;
  }
}
