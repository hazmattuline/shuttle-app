package rest.models.response;

public class NoteResponse {
  private String message;
  private Integer vehicleId;
  private String date;

  public String getDate() {
    return date;
  }

  public String getMessage() {
    return message;
  }

  public Integer getVehicleId() {
    return vehicleId;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public void setVehicleId(Integer vehicleId) {
    this.vehicleId = vehicleId;
  }
}
