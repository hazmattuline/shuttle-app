package rest.models.requests;

public class StartRequest {

  private Integer startConditionID;
  private Integer startdriverID;
  private Double startmileage;
  private Integer startvehicleID;

  public long getDriverID() {
    return startdriverID;
  }

  public Double getMiles() {
    return startmileage;
  }

  public Integer getStartConditionID() {
    return startConditionID;
  }

  public long getVehicleID() {
    return startvehicleID;
  }

  public void setDriverID(Integer driverID) {
    this.startdriverID = driverID;
  }

  public void setMiles(Double mileage) {
    this.startmileage = mileage;
  }

  public void setStartConditionID(Integer startConditionID) {
    this.startConditionID = startConditionID;
  }

  public void setVehicleID(Integer vehicleID) {
    this.startvehicleID = vehicleID;
  }

}
