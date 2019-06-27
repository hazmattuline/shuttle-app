package com.uline.shuttle.app.services.impl;

import com.uline.shuttle.app.client.ShuttleAppClient;
import com.uline.shuttle.app.services.ShuttleAppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rest.models.requests.CoordinateRequest;
import rest.models.requests.EndRequest;
import rest.models.requests.ShiftRequest;
import rest.models.response.CoordinateResponse;
import rest.models.response.EndResponse;
import rest.models.response.ShiftResponse;

@Service
public class ShuttleAppServiceImpl implements ShuttleAppService {

  private ShuttleAppClient shuttleAppClient;

  @Autowired
  public ShuttleAppServiceImpl(ShuttleAppClient shuttleAppClient) {
    this.shuttleAppClient = shuttleAppClient;
  }

  @Override
  public EndResponse endShift(EndRequest endRequest) {
    return shuttleAppClient.endShift(endRequest);
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
  public ShiftResponse startShift(ShiftRequest shiftRequest) {
    return shuttleAppClient.startShift(shiftRequest);
  }
}
