package com.uline.shuttle.app.client;

import java.util.List;
import rest.models.requests.CoordinateRequest;
import rest.models.requests.EndRequest;
import rest.models.requests.FuelRequest;
import rest.models.requests.ShuttleDayDetailsRequest;
import rest.models.requests.StartRequest;
import rest.models.requests.StatusRequest;
import rest.models.response.CoordinateResponse;
import rest.models.response.EndResponse;
import rest.models.response.FuelResponse;
import rest.models.response.ShuttleDayDetailsResponse;
import rest.models.response.ShuttleResponse;
import rest.models.response.StartResponse;
import rest.models.response.VehicleOptionsResponse;

public interface ShuttleAppClient {

  ShuttleResponse changeStatus(StatusRequest statusRequest, Integer id);

  EndResponse endShift(EndRequest endRequest);

  CoordinateResponse enRoute(Integer vehicleId, CoordinateRequest coordinateRequest);

  CoordinateResponse getCoordinates(Integer vehicleID);

  List<VehicleOptionsResponse> getVehicles();

  StartResponse startShift(StartRequest startRequest);

  FuelResponse storeFuel(FuelRequest fuelRequest);

  ShuttleDayDetailsResponse getShuttleDayDetails(ShuttleDayDetailsRequest shuttledDayRequest);

  List<ShuttleResponse> getShuttlesStatus(String status);
}
