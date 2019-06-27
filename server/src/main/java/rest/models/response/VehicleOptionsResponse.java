package rest.models.response;

import java.util.List;

public class VehicleOptionsResponse {
  private List<String> vehicleNames;
  private List<Integer> ids;

  public List<Integer> getIds() {
    return ids;
  }

  public List<String> getVehicleNames() {
    return vehicleNames;
  }

  public void setIds(List<Integer> ids) {
    this.ids = ids;
  }

  public void setVehicleNames(List<String> vehicleNames) {
    this.vehicleNames = vehicleNames;
  }
}
