package rest.models.response;

public class PassengerResponse {
  private Integer vehicleId;
  private Integer passengerCount;
  private Integer curbCount;

  public Integer getCurbCount() {
    return curbCount;
  }

  public Integer getPassengerCount() {
    return passengerCount;
  }

  public Integer getVehicleId() {
    return vehicleId;
  }

  public void setCurbCount(Integer curbCount) {
    this.curbCount = curbCount;
  }

  public void setPassengerCount(Integer passengerCount) {
    this.passengerCount = passengerCount;
  }

  public void setVehicleId(Integer vehicleId) {
    this.vehicleId = vehicleId;
  }
}
