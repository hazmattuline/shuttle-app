package rest.models.requests;

import java.sql.Timestamp;

public class EndRequest {
  private String endCondition;
  private Timestamp endDate;

  private Integer endDriverId;

  private Double endMileage;
  private Integer endVehicleId;

  public Timestamp getDate() {
    return endDate;
  }

  public String getEndCondition() {
    return endCondition;
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

  public void setDate(Timestamp date) {
    this.endDate = date;
  }

  public void setEndConditionId(String endCondition) {
    this.endCondition = endCondition;
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
