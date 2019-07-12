package com.uline.shuttle.app.services;

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

public interface ShuttleAppService {

  ShuttleResponse changeStatus(StatusRequest statusRequest, Integer id);

  CoordinateResponse enRoute(Integer vehicleID, CoordinateRequest coordinateRequest);

  List<VehicleOptionsResponse> getVehicles();

  ShuttleDayDetailsResponse getShuttleDayDetails(ShuttleDayDetailsRequest shuttleDayRequest);

  List<ShuttleResponse> getShuttlesStatus(String status);

  DayResponse submitDay(DayRequest dayRequest);
}
