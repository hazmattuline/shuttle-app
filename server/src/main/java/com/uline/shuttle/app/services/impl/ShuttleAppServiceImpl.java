package com.uline.shuttle.app.services.impl;

import com.uline.shuttle.app.client.ShuttleAppClient;
import com.uline.shuttle.app.services.ShuttleAppService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rest.models.requests.CoordinateRequest;
import rest.models.requests.FuelRequest;
import rest.models.requests.PassengerRequest;
import rest.models.requests.StartRequest;
import rest.models.response.CoordinateResponse;
import rest.models.response.FuelResponse;
import rest.models.response.PassengerResponse;
import rest.models.response.ShuttleResponse;
import rest.models.response.StartResponse;
import rest.models.response.VehicleOptionsResponse;

@Service
public class ShuttleAppServiceImpl implements ShuttleAppService {

  private ShuttleAppClient shuttleAppClient;

  @Autowired
  public ShuttleAppServiceImpl(ShuttleAppClient shuttleAppClient) {
    this.shuttleAppClient = shuttleAppClient;
  }

  @Override
  public CoordinateResponse enRoute(CoordinateRequest coordinateRequest) {
    return shuttleAppClient.enRoute(coordinateRequest);
  }

  @Override
  public List<ShuttleResponse> getActiveShuttles() {
    return shuttleAppClient.getActiveShuttles();
  }

  @Override
  public CoordinateResponse getCoordinates(Integer vehicleID) {
    return shuttleAppClient.getCoordinates(vehicleID);
  }

  @Override
  public VehicleOptionsResponse getVehicleOptions() {
    return shuttleAppClient.getVehicleOptions();
  }

  @Override
  public ShuttleResponse markActive(Integer id) {
    return shuttleAppClient.markActive(id);
  }

  @Override
  public ShuttleResponse markInactive(Integer id) {
    return shuttleAppClient.markInactive(id);
  }

  @Override
  public StartResponse startShift(StartRequest startRequest) {
    return shuttleAppClient.startShift(startRequest);
  }

  @Override
  public FuelResponse storeFuel(FuelRequest fuelRequest) {
    return shuttleAppClient.storeFuel(fuelRequest);
  }

  @Override
  public PassengerResponse storePassengers(PassengerRequest passengerRequest) {
    return shuttleAppClient.storePassengers(passengerRequest);
  }
}
