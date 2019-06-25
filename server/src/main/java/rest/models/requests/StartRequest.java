package rest.models.requests;

public class StartRequest {

  private Integer startConditionID;
  private Integer startDriverID;
  private Double startMileage;
  private Integer startVehicleID;

  public long getDriverID() {
    return startDriverID;
  }

  public Double getMiles() {
    return startMileage;
  }

  public Integer getStartConditionID() {
    return startConditionID;
  }

  public long getVehicleID() {
    return startVehicleID;
  }

  public void setDriverID(Integer driverID) {
    this.startDriverID = driverID;
  }

  public void setMiles(Double mileage) {
    this.startMileage = mileage;
  }

  public void setStartConditionID(Integer startConditionID) {
    this.startConditionID = startConditionID;
  }

  public void setVehicleID(Integer vehicleID) {
    this.startVehicleID = vehicleID;
  }
}
