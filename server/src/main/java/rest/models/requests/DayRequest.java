package rest.models.requests;

public class DayRequest {
  private String date;
  private Integer vehicleId;
  private Double startMileage;
  private Integer endMileage;
  private String startCondition;
  private String endCondition;
  private Double fuelCost;
  private Double fuelQuantity;

  public String getDate() {
    return date;
  }

  public String getEndCondition() {
    return endCondition;
  }

  public Integer getEndMileage() {
    return endMileage;
  }

  public Double getFuelCost() {
    return fuelCost;
  }

  public Double getFuelQuantity() {
    return fuelQuantity;
  }

  public String getStartCondition() {
    return startCondition;
  }

  public Double getStartMileage() {
    return startMileage;
  }

  public Integer getVehicleId() {
    return vehicleId;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public void setEndCondition(String endCondition) {
    this.endCondition = endCondition;
  }

  public void setEndMileage(Integer endMileage) {
    this.endMileage = endMileage;
  }

  public void setFuelCost(Double fuelCost) {
    this.fuelCost = fuelCost;
  }

  public void setFuelQuantity(Double fuelQuantity) {
    this.fuelQuantity = fuelQuantity;
  }

  public void setStartCondition(String startCondition) {
    this.startCondition = startCondition;
  }

  public void setStartMileage(Double startMileage) {
    this.startMileage = startMileage;
  }

  public void setVehicleId(Integer vehicleId) {
    this.vehicleId = vehicleId;
  }
}
