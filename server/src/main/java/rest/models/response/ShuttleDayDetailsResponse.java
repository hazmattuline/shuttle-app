package rest.models.response;

public class ShuttleDayDetailsResponse {
  private Integer curbCount;
  private String date;
  private Integer passengerCount;
  private Integer vehicleId;
  private Integer id;
  private Integer routeId;
  private Integer driverId;

  public Integer getCurbCount() {
    return curbCount;
  }

  public String getDate() {
    return date;
  }

  public Integer getDriverId() {
    return driverId;
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

  public void setCurbCount(Integer curbCount) {
    this.curbCount = curbCount;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public void setDriverId(Integer driverId) {
    this.driverId = driverId;
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
}
