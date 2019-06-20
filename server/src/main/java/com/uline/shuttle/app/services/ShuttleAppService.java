package com.uline.shuttle.app.services;

import rest.models.requests.CoordinateRequest;
import rest.models.requests.ShiftRequest;
import rest.models.response.CoordinateResponse;
import rest.models.response.ShiftResponse;

public interface ShuttleAppService {

  CoordinateResponse enRoute(CoordinateRequest coordinateRequest);

  CoordinateResponse getCoordinates(String vehicleName);

  ShiftResponse startShift(ShiftRequest shiftRequest);
}
