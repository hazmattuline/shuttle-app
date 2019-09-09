package com.uline.shuttle.app.client;

import java.util.List;
import rest.models.requests.DayRequest;
import rest.models.requests.NoteRequest;
import rest.models.requests.ShuttleRequest;
import rest.models.requests.TripRequest;
import rest.models.response.DayResponse;
import rest.models.response.NoteResponse;
import rest.models.response.RouteResponse;
import rest.models.response.ShuttleResponse;
import rest.models.response.TripResponse;

public interface ShuttleAppClient {

  ShuttleResponse changeStatus(ShuttleRequest shuttleRequest, Integer id);

  ShuttleResponse enRoute(Integer id, ShuttleRequest shuttleRequest);

  List<DayResponse> getDay(String date, Integer vehicleId);

  List<RouteResponse> getRoutes();

  List<ShuttleResponse> getShuttlesStatus(String status);

  TripResponse getTrip(String date, Integer vehicleId);

  TripResponse postTrip(TripRequest shuttledDayRequest);

  DayResponse submitDay(DayRequest dayRequest);

  NoteResponse submitNote(NoteRequest noteRequest);

}
