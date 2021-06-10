package rest.models.response;

public class ShuttleResponse {
  private Integer vehicleId;
  private String name;
  private String status;
  private Double latitudeCoordinates;
  private Double longitudeCoordinates;
  private String shuttleType;
  private String rentalIndicator;
  private Integer personId;

  public Integer getPersonId() {
    return personId;
  }

  public void setPersonId(Integer personId) {
    this.personId = personId;
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

  public String getRentalIndicator() {
    return rentalIndicator;
  }

  public String getShuttleType() {
    return shuttleType;
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

  public void setName(String name) {
    this.name = name;
  }

  public void setRentalIndicator(String rentalIndicator) {
    this.rentalIndicator = rentalIndicator;
  }

  public void setShuttleType(String shuttleType) {
    this.shuttleType = shuttleType;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public void setVehicleId(Integer vehicleId) {
    this.vehicleId = vehicleId;
  }
}
