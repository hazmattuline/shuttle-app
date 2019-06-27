package com.uline.shuttle.app.client;

import rest.models.requests.CoordinateRequest;
import rest.models.requests.EndRequest;
import rest.models.requests.ShiftRequest;
import rest.models.response.CoordinateResponse;
import rest.models.response.EndResponse;
import rest.models.response.ShiftResponse;

public interface ShuttleAppClient {

  EndResponse endShift(EndRequest endRequest);

  CoordinateResponse enRoute(CoordinateRequest coordinateRequest);

  CoordinateResponse getCoordinates(Integer vehicleID);

  ShiftResponse startShift(ShiftRequest shiftRequest);
}
