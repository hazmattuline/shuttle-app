package rest.models.response;

public class CoordResponse {

  private double latitudeCoords;
  private double longitudeCoords;

  public double getLatitudeCoords() {
    return latitudeCoords;
  }

  public double getLongitudeCoords() {
    return longitudeCoords;
  }

  public void setLatitudeCoords(double latitudeCoords) {
    this.latitudeCoords = latitudeCoords;
  }

  public void setLongitudeCoords(double longitudeCoords) {
    this.longitudeCoords = longitudeCoords;
  }
}
