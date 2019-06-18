package com.uline.shuttle.app.client;

import rest.models.requests.CoordinateRequest;
import rest.models.requests.ShiftRequest;
import rest.models.response.CoordinateResponse;
import rest.models.response.ShiftResponse;

public interface ShuttleAppClient {

  CoordinateResponse enRoute(CoordinateRequest coordinateRequest);

  CoordinateResponse getCoordinates();

  ShiftResponse startShift(ShiftRequest shiftRequest);
}
