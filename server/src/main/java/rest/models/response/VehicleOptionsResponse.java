package rest.models.response;

public class VehicleOptionsResponse {
  private String[] vehicleNames;
  private Integer[] ids;

  public Integer[] getIds() {
    return ids;
  }

  public String[] getVehicleNames() {
    return vehicleNames;
  }

  public void setIds(Integer[] ids) {
    this.ids = ids;
  }

  public void setVehicleNames(String[] vehicleNames) {
    this.vehicleNames = vehicleNames;
  }
}
