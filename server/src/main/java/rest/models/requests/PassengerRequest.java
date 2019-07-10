package rest.models.requests;

public class PassengerRequest {
  private Integer curbCount;
  private String date;
  private Integer passengerCount;
  private Integer vehicleId;

  public Integer getCurbCount() {
    return curbCount;
  }

  public String getDate() {
    return date;
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

  public void setDate(String date) {
    this.date = date;
  }

  public void setPassengerCount(Integer passengerCount) {
    this.passengerCount = passengerCount;
  }

  public void setVehicleId(Integer vehicleId) {
    this.vehicleId = vehicleId;
  }
}
