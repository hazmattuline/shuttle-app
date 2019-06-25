package com.uline.shuttle.app.client;

import rest.models.requests.CoordinateRequest;
import rest.models.requests.ShiftRequest;
import rest.models.response.CoordinateResponse;
import rest.models.response.ShiftResponse;
import rest.models.response.VehicleOptionsResponse;

public interface ShuttleAppClient {

	CoordinateResponse enRoute(CoordinateRequest coordinateRequest);

	CoordinateResponse getCoordinates(Integer vehicleID);

	VehicleOptionsResponse getVehicleOptions();

	ShiftResponse startShift(ShiftRequest shiftRequest);
}
