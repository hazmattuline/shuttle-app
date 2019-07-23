package com.uline.shuttle.app.client;

import java.util.List;
import rest.models.requests.CoordinateRequest;
import rest.models.requests.DayRequest;
import rest.models.requests.NoteRequest;
import rest.models.requests.ShuttleDayDetailsRequest;
import rest.models.requests.StatusRequest;
import rest.models.response.CoordinateResponse;
import rest.models.response.DayResponse;
import rest.models.response.NoteResponse;
import rest.models.response.RouteResponse;
import rest.models.response.ShuttleDayDetailsResponse;
import rest.models.response.ShuttleResponse;

public interface ShuttleAppClient {

  ShuttleResponse changeStatus(StatusRequest statusRequest, Integer id);

  CoordinateResponse enRoute(Integer vehicleID, CoordinateRequest coordinateRequest);

  List<RouteResponse> getRoutes();

  List<ShuttleResponse> getShuttlesStatus(String status);

  ShuttleDayDetailsResponse getTrip(String date, Integer vehicleId);

  ShuttleDayDetailsResponse postTrip(ShuttleDayDetailsRequest shuttledDayRequest);

  DayResponse submitDay(DayRequest dayRequest);

  NoteResponse submitNote(NoteRequest noteRequest);

  DayResponse getDay(String date, Integer vehicleId);
}
