package rest.models.response;

public class ShiftResponse {

  private long driverID;
  private long id;
  private float miles;
  private long vehicleID;

  public long getDriverID() {
    return driverID;
  }

  public long getId() {
    return id;
  }

  public float getMiles() {
    return miles;
  }

  public long getVehicleID() {
    return vehicleID;
  }

  public void setDriverID(long driverID) {
    this.driverID = driverID;
  }

  public void setId(long id) {
    this.id = id;
  }

  public void setMiles(float miles) {
    this.miles = miles;
  }

  public void setVehicleID(long vehicleID) {
    this.vehicleID = vehicleID;
  }
}
