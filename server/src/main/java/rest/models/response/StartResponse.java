package rest.models.response;

import java.sql.Timestamp;

public class StartResponse {

  private String startCondition;
  private Timestamp startDate;
  private Integer startDriverID;
  private Double startMileage;
  private Integer startVehicleID;

  public Timestamp getDate() {
    return startDate;
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
    this.startDate = date;
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
