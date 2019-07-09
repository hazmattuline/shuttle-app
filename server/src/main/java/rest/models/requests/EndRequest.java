package rest.models.requests;

import java.sql.Timestamp;

public class EndRequest {
  private Timestamp date;
  private String endCondition;

  private Integer endDriverId;

  private Double endMileage;
  private Integer endVehicleId;

  public Timestamp getDate() {
    return date;
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
    this.date = date;
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
