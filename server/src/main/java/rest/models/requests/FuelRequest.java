package rest.models.requests;

public class FuelRequest {
  private Double fuelCost;
  private Double fuelQuantity;

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
