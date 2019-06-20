package rest.models.requests;

public class CoordinateRequest {

  private Double latitudeCoordinates;
  private Double longitudeCoordinates;
  private String vehicleName;

  public Double getLatitudeCoordinates() {
    return latitudeCoordinates;
  }

  public Double getLongitudeCoordinates() {
    return longitudeCoordinates;
  }

  public String getVehicleName() {
    return vehicleName;
  }

  public void setLatitudeCoordinates(Double latitudeCoordinates) {
    this.latitudeCoordinates = latitudeCoordinates;
  }

  public void setLongitudeCoordinates(Double longitudeCoordinates) {
    this.longitudeCoordinates = longitudeCoordinates;
  }

  public void setVehicleName(String vehicleName) {
    this.vehicleName = vehicleName;
  }
}
