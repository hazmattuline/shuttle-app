package com.uline.shuttle.app.services;

import java.util.List;
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

public interface ShuttleAppService {

  CoordinateResponse enRoute(CoordinateRequest coordinateRequest);

  List<ShuttleResponse> getActiveShuttles();

  CoordinateResponse getCoordinates(Integer vehicleID);

  VehicleOptionsResponse getVehicleOptions();

  ShuttleResponse markActive(Integer id);

  ShuttleResponse markInactive(Integer id);

  StartResponse startShift(StartRequest startRequest);

  FuelResponse storeFuel(FuelRequest fuelRequest);

  PassengerResponse storePassengers(PassengerRequest passengerRequest);
}
