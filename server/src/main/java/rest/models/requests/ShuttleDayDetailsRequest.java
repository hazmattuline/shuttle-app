package rest.models.requests;

public class ShuttleDayDetailsRequest {
  private Integer curbCount;
  private String date;
  private Integer passengerCount;
  private Integer vehicleID;
  private Integer id;

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

  public Integer getVehicleId() {
    return vehicleID;
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

  public void setVehicleId(Integer vehicleId) {
    this.vehicleID = vehicleId;
  }
}
