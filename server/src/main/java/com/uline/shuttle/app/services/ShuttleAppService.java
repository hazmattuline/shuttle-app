package com.uline.shuttle.app.services;

import java.util.List;
import rest.models.requests.CoordinateRequest;
import rest.models.requests.DayRequest;
import rest.models.requests.NoteRequest;
import rest.models.requests.ShuttleDayDetailsRequest;
import rest.models.requests.StatusRequest;
import rest.models.response.CoordinateResponse;
import rest.models.response.DayResponse;
import rest.models.response.NoteResponse;
import rest.models.response.ShuttleDayDetailsResponse;
import rest.models.response.ShuttleResponse;

public interface ShuttleAppService {

  ShuttleResponse changeStatus(StatusRequest statusRequest, Integer id);

  CoordinateResponse enRoute(Integer vehicleID, CoordinateRequest coordinateRequest);

  ShuttleDayDetailsResponse getShuttleDayDetails(ShuttleDayDetailsRequest shuttleDayRequest);

  List<ShuttleResponse> getShuttlesStatus(String status);

  List<VehicleOptionsResponse> getVehicles();

  DayResponse submitDay(DayRequest dayRequest);

  NoteResponse submitNote(NoteRequest noteRequest);
}
