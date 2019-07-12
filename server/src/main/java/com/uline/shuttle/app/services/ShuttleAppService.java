package com.uline.shuttle.app.services;

import java.util.List;
import rest.models.requests.CoordinateRequest;
import rest.models.requests.DayRequest;
import rest.models.requests.PassengerRequest;
import rest.models.requests.StatusRequest;
import rest.models.response.CoordinateResponse;
import rest.models.response.DayResponse;
import rest.models.response.PassengerResponse;
import rest.models.response.ShuttleResponse;
import rest.models.response.VehicleOptionsResponse;

public interface ShuttleAppService {

  ShuttleResponse changeStatus(StatusRequest statusRequest, Integer id);

  CoordinateResponse enRoute(CoordinateRequest coordinateRequest);

  List<ShuttleResponse> getShuttlesStatus(String status);

  VehicleOptionsResponse getVehicleOptions();

  PassengerResponse storePassengers(PassengerRequest passengerRequest);

  DayResponse submitDay(DayRequest dayRequest);
}
