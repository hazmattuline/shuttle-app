package rest.models.requests;

public class EndRequest {

  private Integer endConditionId;
  private Integer endDriverId;
  private Double endMileage;
  private Integer startVehicleId;

  public Integer getEndConditionId() {
    return endConditionId;
  }

  public Integer getEndDriverId() {
    return endDriverId;
  }

  public Double getEndMileage() {
    return endMileage;
  }

  public Integer getStartVehicleId() {
    return startVehicleId;
  }

  public void setEndConditionId(Integer endConditionId) {
    this.endConditionId = endConditionId;
  }

  public void setEndDriverId(Integer endDriverId) {
    this.endDriverId = endDriverId;
  }

  public void setEndMileage(Double endMileage) {
    this.endMileage = endMileage;
  }

  public void setStartVehicleId(Integer startVehicleId) {
    this.startVehicleId = startVehicleId;
  }
}
