package rest.models.response;

public class DayResponse {
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

  public void setDate(String date) {
    this.date = date;
  }

  public Integer getVehicleId() {
    return vehicleId;
  }

  public void setVehicleId(Integer vehicleId) {
    this.vehicleId = vehicleId;
  }

  public Double getStartMileage() {
    return startMileage;
  }

  public void setStartMileage(Double startMileage) {
    this.startMileage = startMileage;
  }

  public Integer getEndMileage() {
    return endMileage;
  }

  public void setEndMileage(Integer endMileage) {
    this.endMileage = endMileage;
  }

  public String getStartCondition() {
    return startCondition;
  }

  public void setStartCondition(String startCondition) {
    this.startCondition = startCondition;
  }

  public String getEndCondition() {
    return endCondition;
  }

  public void setEndCondition(String endCondition) {
    this.endCondition = endCondition;
  }

  public Double getFuelCost() {
    return fuelCost;
  }

  public void setFuelCost(Double fuelCost) {
    this.fuelCost = fuelCost;
  }

  public Double getFuelQuantity() {
    return fuelQuantity;
  }

  public void setFuelQuantity(Double fuelQuantity) {
    this.fuelQuantity = fuelQuantity;
  }
}
