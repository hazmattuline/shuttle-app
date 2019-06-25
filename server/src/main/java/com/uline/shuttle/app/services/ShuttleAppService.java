package com.uline.shuttle.app.services;

import rest.models.requests.CoordinateRequest;
import rest.models.requests.FuelRequest;
import rest.models.requests.PassengerRequest;
import rest.models.requests.StartRequest;
import rest.models.response.CoordinateResponse;
import rest.models.response.FuelResponse;
import rest.models.response.PassengerResponse;
import rest.models.response.StartResponse;
import rest.models.response.VehicleOptionsResponse;

public interface ShuttleAppService {

	CoordinateResponse enRoute(CoordinateRequest coordinateRequest);

	FuelResponse fuelResponse(FuelRequest fuelRequest);

	CoordinateResponse getCoordinates(Integer vehicleID);

	VehicleOptionsResponse getVehicleOptions();

	StartResponse startShift(StartRequest startRequest);

	PassengerResponse storePassengers(PassengerRequest passengerRequest);
}
