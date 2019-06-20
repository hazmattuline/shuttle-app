package rest.models.requests;

public class CoordRequest {

  private float latitudeCoords;
  private float longitudeCoords;

  public float getLatitudeCoords() {
    return latitudeCoords;
  }

  public float getLongitudeCoords() {
    return longitudeCoords;
  }

  public void setLatitudeCoords(float latitudeCoords) {
    this.latitudeCoords = latitudeCoords;
  }

  public void setLongitudeCoords(float longitudeCoords) {
    this.longitudeCoords = longitudeCoords;
  }
}
