package com.uline.shuttle.app.services;

import java.util.List;

import rest.models.requests.CoordinateRequest;
import rest.models.requests.EndRequest;
import rest.models.requests.FuelRequest;
import rest.models.requests.PassengerRequest;
import rest.models.requests.StartRequest;
import rest.models.requests.StatusRequest;
import rest.models.response.CoordinateResponse;
import rest.models.response.EndResponse;
import rest.models.response.FuelResponse;
import rest.models.response.PassengerResponse;
import rest.models.response.ShuttleResponse;
import rest.models.response.StartResponse;
import rest.models.response.VehicleOptionsResponse;

public interface ShuttleAppService {

  ShuttleResponse changeStatus(StatusRequest statusRequest, Integer id);

  EndResponse endShift(EndRequest endRequest);

  CoordinateResponse enRoute(Integer vehicleId, CoordinateRequest coordinateRequest);

  List<ShuttleResponse> getActiveShuttles();

  CoordinateResponse getCoordinates(Integer vehicleID);

  List<VehicleOptionsResponse> getVehicles();

  StartResponse startShift(StartRequest startRequest);

  FuelResponse storeFuel(FuelRequest fuelRequest);

  PassengerResponse storePassengers(PassengerRequest passengerRequest);

}
