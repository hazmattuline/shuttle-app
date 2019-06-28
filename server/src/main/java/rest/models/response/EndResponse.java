package rest.models.response;

public class EndResponse {

  private Integer endConditionId;
  private Integer endDriverId;
  private Double endMileage;
  private Integer endVehicleId;

  public Integer getEndConditionId() {
    return endConditionId;
  }

  public Integer getEndDriverId() {
    return endDriverId;
  }

  public Double getEndMileage() {
    return endMileage;
  }

  public Integer getEndVehicleId() {
    return endVehicleId;
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

  public void setEndVehicleId(Integer endVehicleId) {
    this.endVehicleId = endVehicleId;
  }
}
