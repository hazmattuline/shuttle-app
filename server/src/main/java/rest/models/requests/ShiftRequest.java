package rest.models.requests;

public class ShiftRequest {

  private long driverID;
  private float miles;
  private long vehicleID;

  public long getDriverID() {
    return driverID;
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

  public void setMiles(float miles) {
    this.miles = miles;
  }

  public void setVehicleID(long vehicleID) {
    this.vehicleID = vehicleID;
  }

  @Override
  public String toString() {
    return "ShiftRequest [driverID="
        + driverID
        + ", miles="
        + miles
        + ", vehicleID="
        + vehicleID
        + "]";
  }
}
