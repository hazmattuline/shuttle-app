package rest.models.response;

import java.sql.Timestamp;

public class StartResponse {

  private Timestamp date;
  private String startCondition;
  private Integer startDriverID;
  private Double startMileage;
  private Integer startVehicleID;

  public Timestamp getDate() {
    return date;
  }

  public long getDriverID() {
    return startDriverID;
  }

  public Double getMiles() {
    return startMileage;
  }

  public String getStartConditionID() {
    return startCondition;
  }

  public long getVehicleID() {
    return startVehicleID;
  }

  public void setDate(Timestamp date) {
    this.date = date;
  }

  public void setDriverID(Integer driverID) {
    this.startDriverID = driverID;
  }

  public void setMiles(Double mileage) {
    this.startMileage = mileage;
  }

  public void setStartCondition(String startCondition) {
    this.startCondition = startCondition;
  }

  public void setVehicleID(Integer vehicleID) {
    this.startVehicleID = vehicleID;
  }
}
