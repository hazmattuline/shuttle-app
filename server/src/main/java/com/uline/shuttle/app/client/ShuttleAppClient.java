package com.uline.shuttle.app.client;

import java.util.List;
import rest.models.requests.CoordinateRequest;
import rest.models.requests.DayRequest;
import rest.models.requests.ShuttleDayDetailsRequest;
import rest.models.requests.StatusRequest;
import rest.models.response.CoordinateResponse;
import rest.models.response.DayResponse;
import rest.models.response.ShuttleDayDetailsResponse;
import rest.models.response.ShuttleResponse;
import rest.models.response.VehicleOptionsResponse;

public interface ShuttleAppClient {

  ShuttleResponse changeStatus(StatusRequest statusRequest, Integer id);

  CoordinateResponse enRoute(Integer vehicleID, CoordinateRequest coordinateRequest);

  CoordinateResponse getCoordinates(Integer vehicleID);

  List<VehicleOptionsResponse> getVehicles();

  ShuttleDayDetailsResponse getShuttleDayDetails(ShuttleDayDetailsRequest shuttledDayRequest);

  List<ShuttleResponse> getShuttlesStatus(String status);

  DayResponse submitDay(DayRequest dayRequest);
}
