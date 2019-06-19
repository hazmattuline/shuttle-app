package com.uline.shuttle.app.services;

import rest.models.requests.CoordRequest;
import rest.models.requests.ShiftRequest;
import rest.models.response.CoordResponse;
import rest.models.response.ShiftResponse;

public interface ShuttleAppService {

  public CoordResponse enRoute(CoordRequest coordRequest);

  public ShiftResponse startShift(ShiftRequest shiftRequest);
}
