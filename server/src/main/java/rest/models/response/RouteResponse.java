package rest.models.response;

public class RouteResponse {
  private Integer id;
  private String toWarehouse;
  private String fromWarehouse;

  public String getFromWarehouse() {
    return fromWarehouse;
  }

  public Integer getId() {
    return id;
  }

  public String getToWarehouse() {
    return toWarehouse;
  }

  public void setFromWarehouse(String fromWarehouse) {
    this.fromWarehouse = fromWarehouse;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public void setToWarehouse(String toWarehouse) {
    this.toWarehouse = toWarehouse;
  }
}
