package com.uline.shuttle.app.services.impl;

import com.uline.shuttle.app.client.ShuttleAppClient;
import com.uline.shuttle.app.services.ShuttleAppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rest.models.requests.CoordinateRequest;
import rest.models.requests.FuelRequest;
import rest.models.requests.StartRequest;
import rest.models.response.CoordinateResponse;
import rest.models.response.FuelResponse;
import rest.models.response.StartResponse;

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
  public CoordinateResponse getCoordinates(Integer vehicleID) {
    return shuttleAppClient.getCoordinates(vehicleID);
  }

  @Override
  public StartResponse startShift(StartRequest startRequest) {
    return shuttleAppClient.startShift(startRequest);
  }

  @Override
  public FuelResponse storeFuel(FuelRequest fuelRequest) {
    return shuttleAppClient.storeFuel(fuelRequest);
  }
}
