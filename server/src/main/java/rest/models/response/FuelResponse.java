package rest.models.response;

public class FuelResponse {
  private Double fuelCost;
  private Double fuelQuantity;
  private String fuelDate;
  private Integer fuelVehicleId;

  public String getFuelDate() {
    return fuelDate;
  }

  public void setFuelDate(String fuelDate) {
    this.fuelDate = fuelDate;
  }

  public Integer getFuelVehicleId() {
    return fuelVehicleId;
  }

  public void setFuelVehicleId(Integer fuelVehicleId) {
    this.fuelVehicleId = fuelVehicleId;
  }

  public Double getFuelCost() {
    return fuelCost;
  }

  public Double getFuelQuantity() {
    return fuelQuantity;
  }

  public void setFuelCost(Double fuelCost) {
    this.fuelCost = fuelCost;
  }

  public void setFuelQuantity(Double fuelQuantity) {
    this.fuelQuantity = fuelQuantity;
  }
}
