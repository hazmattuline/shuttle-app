package com.uline.shuttle.app.client;

import rest.models.requests.CoordRequest;
import rest.models.requests.ShiftRequest;
import rest.models.response.CoordResponse;
import rest.models.response.ShiftResponse;

public interface ShuttleAppClient {

  CoordResponse enRoute(CoordRequest coordRequest);

  ShiftResponse startShift(ShiftRequest shiftRequest);
}
