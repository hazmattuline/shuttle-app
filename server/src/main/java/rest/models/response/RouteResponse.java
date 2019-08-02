package rest.models.response;

public class RouteResponse {
  private Integer id;
  private String toWarehouse;
  private String fromWarehouse;
  private String toWarehouseDoor;
  private String fromWarehouseDoor;

  public String getFromWarehouse() {
    return fromWarehouse;
  }

  public String getFromWarehouseDoor() {
    return fromWarehouseDoor;
  }

  public Integer getId() {
    return id;
  }

  public String getToWarehouse() {
    return toWarehouse;
  }

  public String getToWarehouseDoor() {
    return toWarehouseDoor;
  }

  public void setFromWarehouse(String fromWarehouse) {
    this.fromWarehouse = fromWarehouse;
  }

  public void setFromWarehouseDoor(String fromWarehouseDoor) {
    this.fromWarehouseDoor = fromWarehouseDoor;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public void setToWarehouse(String toWarehouse) {
    this.toWarehouse = toWarehouse;
  }

  public void setToWarehouseDoor(String toWarehouseDoor) {
    this.toWarehouseDoor = toWarehouseDoor;
  }
}
