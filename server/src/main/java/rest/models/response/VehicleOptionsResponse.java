package rest.models.response;

public class VehicleOptionsResponse {
  private Integer id;
  private String vehicleName;

  public Integer getId() {
    return id;
  }

  public String getVehicleName() {
    return vehicleName;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public void setVehicleName(String vehicleName) {
    this.vehicleName = vehicleName;
  }
}
