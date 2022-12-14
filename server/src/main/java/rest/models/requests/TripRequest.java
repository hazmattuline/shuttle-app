package rest.models.requests;

public class TripRequest {
  private Integer curbCount;
  private String date;
  private Integer passengerCount;
  private Integer vehicleId;
  private Integer id;
  private Integer routeId;
  private String activityTimestamp;

  public Integer getCurbCount() {
    return curbCount;
  }

  public String getDate() {
    return date;
  }

  public Integer getId() {
    return id;
  }

  public Integer getPassengerCount() {
    return passengerCount;
  }

  public Integer getRouteId() {
    return routeId;
  }

  public Integer getVehicleId() {
    return vehicleId;
  }

  public String getActivityTimestamp() {
    return activityTimestamp;
  }

  public void setCurbCount(Integer curbCount) {
    this.curbCount = curbCount;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public void setPassengerCount(Integer passengerCount) {
    this.passengerCount = passengerCount;
  }

  public void setRouteId(Integer routeId) {
    this.routeId = routeId;
  }

  public void setVehicleId(Integer vehicleId) {
    this.vehicleId = vehicleId;
  }

  public void setActivityTimestamp(String activityTimestamp) {
    this.activityTimestamp = activityTimestamp;
  }
}
