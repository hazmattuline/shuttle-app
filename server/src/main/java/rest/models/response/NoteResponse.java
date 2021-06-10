package rest.models.response;

public class NoteResponse {
  private String message;
  private Integer vehicleId;
  private String date;
  private Integer id;
  private Integer sequenceNumber;
  private Integer dayId;

  public String getDate() {
    return date;
  }

  public Integer getDayId() {
    return dayId;
  }

  public Integer getId() {
    return id;
  }

  public String getMessage() {
    return message;
  }

  public Integer getSequenceNumber() {
    return sequenceNumber;
  }

  public Integer getVehicleId() {
    return vehicleId;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public void setDayId(Integer dayId) {
    this.dayId = dayId;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public void setSequenceNumber(Integer sequenceNumber) {
    this.sequenceNumber = sequenceNumber;
  }

  public void setVehicleId(Integer vehicleId) {
    this.vehicleId = vehicleId;
  }
}
