package com.uline.shuttle.app.client;

import rest.models.requests.CoordinateRequest;
import rest.models.requests.StartRequest;
import rest.models.response.CoordinateResponse;
import rest.models.response.StartResponse;

public interface ShuttleAppClient {

  CoordinateResponse enRoute(CoordinateRequest coordinateRequest);

  CoordinateResponse getCoordinates(Integer vehicleID);

  StartResponse startShift(StartRequest startRequest);
}
