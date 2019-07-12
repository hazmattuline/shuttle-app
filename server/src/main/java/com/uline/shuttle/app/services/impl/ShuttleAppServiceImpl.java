package com.uline.shuttle.app.services.impl;

import com.uline.shuttle.app.client.ShuttleAppClient;
import com.uline.shuttle.app.services.ShuttleAppService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rest.models.requests.CoordinateRequest;
import rest.models.requests.DayRequest;
import rest.models.requests.PassengerRequest;
import rest.models.requests.StatusRequest;
import rest.models.response.CoordinateResponse;
import rest.models.response.DayResponse;
import rest.models.response.PassengerResponse;
import rest.models.response.ShuttleResponse;
import rest.models.response.VehicleOptionsResponse;

@Service
public class ShuttleAppServiceImpl implements ShuttleAppService {

  private ShuttleAppClient shuttleAppClient;

  @Autowired
  public ShuttleAppServiceImpl(ShuttleAppClient shuttleAppClient) {
    this.shuttleAppClient = shuttleAppClient;
  }

  @Override
  public ShuttleResponse changeStatus(StatusRequest statusRequest, Integer id) {
    return shuttleAppClient.changeStatus(statusRequest, id);
  }

  @Override
  public CoordinateResponse enRoute(CoordinateRequest coordinateRequest) {
    return shuttleAppClient.enRoute(coordinateRequest);
  }

  @Override
  public List<ShuttleResponse> getShuttlesStatus(String status) {
    return shuttleAppClient.getShuttlesStatus(status);
  }

  @Override
  public VehicleOptionsResponse getVehicleOptions() {
    return shuttleAppClient.getVehicleOptions();
  }

  @Override
  public PassengerResponse storePassengers(PassengerRequest passengerRequest) {
    return shuttleAppClient.storePassengers(passengerRequest);
  }

  @Override
  public DayResponse submitDay(DayRequest dayRequest) {
    return shuttleAppClient.submitDay(dayRequest);
  }
}
