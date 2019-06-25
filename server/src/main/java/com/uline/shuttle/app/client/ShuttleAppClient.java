<<<<<<< HEAD
package com.uline.shuttle.app.client;

import rest.models.requests.CoordinateRequest;
import rest.models.requests.FuelRequest;
import rest.models.requests.PassengerRequest;
import rest.models.requests.StartRequest;
import rest.models.response.CoordinateResponse;
import rest.models.response.FuelResponse;
import rest.models.response.PassengerResponse;
import rest.models.response.StartResponse;
import rest.models.response.VehicleOptionsResponse;

public interface ShuttleAppClient {

	CoordinateResponse enRoute(CoordinateRequest coordinateRequest);

	CoordinateResponse getCoordinates(Integer vehicleID);

	VehicleOptionsResponse getVehicleOptions();

	StartResponse startShift(StartRequest startRequest);

	FuelResponse storeFuel(FuelRequest fuelRequest);
	PassengerResponse storePassengers(PassengerRequest passengerRequest);
}

