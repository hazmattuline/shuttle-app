package com.uline.shuttle.app.services;

import rest.models.requests.CoordinateRequest;
import rest.models.requests.FuelRequest;
import rest.models.requests.StartRequest;
import rest.models.response.CoordinateResponse;
import rest.models.response.FuelResponse;
import rest.models.response.StartResponse;

public interface ShuttleAppService {

  CoordinateResponse enRoute(CoordinateRequest coordinateRequest);

  FuelResponse fuelResponse(FuelRequest fuelRequest);

  CoordinateResponse getCoordinates(Integer vehicleID);

  StartResponse startShift(StartRequest startRequest);
}
