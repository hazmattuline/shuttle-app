package rest.models.requests;

public class CoordinateRequest {

  private double latitudeCoordinates;
  private double longitudeCoordinates;

  public double getLatitudeCoordinates() {
    return latitudeCoordinates;
  }

  public double getLongitudeCoordinates() {
    return longitudeCoordinates;
  }

  public void setLatitudeCoordinates(double latitudeCoordinates) {
    this.latitudeCoordinates = latitudeCoordinates;
  }

  public void setLongitudeCoordinates(double longitudeCoordinates) {
    this.longitudeCoordinates = longitudeCoordinates;
  }
}
