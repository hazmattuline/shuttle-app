package com.uline.shuttle.app.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.uline.common.metrics.ExecutionTime;
import com.uline.shuttle.app.services.ShuttleAppService;
import com.uline.shuttle.app.services.StagedRequestService;
import io.swagger.v3.oas.annotations.Operation;
import java.net.URI;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import rest.models.requests.DayRequest;
import rest.models.requests.NoteRequest;
import rest.models.requests.ShuttleRequest;
import rest.models.requests.StagedRequest;
import rest.models.requests.TripRequest;
import rest.models.response.DayResponse;
import rest.models.response.NoteResponse;
import rest.models.response.RouteResponse;
import rest.models.response.ShuttleResponse;
import rest.models.response.TripResponse;

@RestController
@RequestMapping("/api")
public class ShuttleAppController {

  private ShuttleAppService shuttleAppService;
  private StagedRequestService stagedRequestService;

  @Autowired
  public ShuttleAppController(
      ShuttleAppService shuttleAppService, StagedRequestService stagedRequestService) {
    this.stagedRequestService = stagedRequestService;

    this.shuttleAppService = shuttleAppService;
  }

  @ExecutionTime("ShuttleAppController.changeStatus")
  @Operation(summary = "change shuttle's status")
  @PatchMapping(value = "/shuttles/{id}/status")
  public ShuttleResponse changeStatus(
      @RequestBody ShuttleRequest shuttleRequest, @PathVariable("id") Integer id) {
    return shuttleAppService.changeStatus(shuttleRequest, id);
  }

  @ExecutionTime("ShuttleAppController.enRoute")
  @Operation(summary = "posting the coordinates and storing in a database")
  @PatchMapping(value = "/shuttles/{id}/coordinates")
  public ShuttleResponse enRoute(
      @PathVariable("id") Integer id, @RequestBody ShuttleRequest shuttleRequest) {
    return shuttleAppService.enRoute(id, shuttleRequest);
  }

  @Operation(summary = "getting day from the database")
  @GetMapping(value = "/shuttle-days")
  public List<DayResponse> getDay(
      @RequestParam(value = "date") String date,
      @RequestParam(value = "vehicle") Integer vehicleId) {
    return shuttleAppService.getDay(date, vehicleId);
  }

  @ExecutionTime("ShuttleAppController.getRoutes")
  @Operation(summary = "getting the routes from the database")
  @GetMapping(value = "/shuttle-routes")
  public List<RouteResponse> getRoutes() {
    return shuttleAppService.getRoutes();
  }

  @ExecutionTime("ShuttleAppController.getShuttlesStatus")
  @Operation(summary = "getting the shuttles by status")
  @GetMapping(value = "/shuttles")
  public List<ShuttleResponse> getShuttlesStatus(
      @RequestParam(name = "status", required = false) String status) {
    return shuttleAppService.getShuttlesStatus(status);
  }

  @ExecutionTime("ShuttleAppController.getTrip")
  @Operation(summary = "getting the passenger amount details from the database")
  @GetMapping(value = "/shuttle-trips")
  public TripResponse getTrip(
      @RequestParam(value = "date") String date,
      @RequestParam(value = "vehicle") Integer vehicleId) {
    return shuttleAppService.getTrip(date, vehicleId);
  }

  @ExecutionTime("ShuttleAppController.postTrip")
  @Operation(summary = "posting the trip details to the database")
  @PostMapping(value = "/shuttle-trips")
  public TripResponse postTrip(@RequestBody TripRequest shuttleDayRequest) {
    return shuttleAppService.postTrip(shuttleDayRequest);
  }

  @ExecutionTime("ShuttleAppController.submitDay")
  @Operation(summary = "posting to the Shuttle Vehicle Day table")
  @PostMapping(value = "/shuttle-days")
  public DayResponse submitDay(@RequestBody DayRequest dayRequest) {
    return shuttleAppService.submitDay(dayRequest);
  }

  @ExecutionTime("ShuttleAppController.submitNote")
  @Operation(summary = "posting note to database")
  @PostMapping(value = "/shuttle-notes")
  public NoteResponse submitNote(@RequestBody NoteRequest noteRequest) {
    return shuttleAppService.submitNote(noteRequest);
  }

  @ExecutionTime("ShuttleAppController.addDayRecord")
  @Operation(summary = "sending record to CM to be staged")
  @PostMapping(value = "/staged-requests/add-shuttle-days")
  public ResponseEntity<Void> addDayRecord(@RequestBody StagedRequest stagedRequest) {

    URI stagedRequestLocation = stagedRequestService.addDayRecord(stagedRequest);

    return ResponseEntity.created(stagedRequestLocation).build();
  }

  @ExecutionTime("ShuttleAppController.addVehicle")
  @Operation(summary = "sending record to CM to be staged")
  @PostMapping(value = "/staged-requests/add-shuttle-vehicle")
  public ResponseEntity<Void> addVehicle(@RequestBody StagedRequest stagedRequest) {

    URI stagedRequestLocation = stagedRequestService.addVehicle(stagedRequest);

    return ResponseEntity.created(stagedRequestLocation).build();
  }

  @ExecutionTime("ShuttleAppController.updateDayRecord")
  @Operation(summary = "sending record to CM to be staged")
  @PostMapping(value = "/staged-requests/shuttle-days")
  public ResponseEntity<Void> updatedDayRecord(
      @RequestParam(value = "date") String date,
      @RequestParam(value = "vehicle") Integer id,
      @RequestBody StagedRequest stagedRequest)
      throws JsonProcessingException {

    URI stagedRequestLocation = stagedRequestService.updateDayRecord(id, date, stagedRequest);

    return ResponseEntity.created(stagedRequestLocation).build();
  }

  @ExecutionTime("ShuttleAppController.updateShuttle")
  @Operation(summary = "sending shuttle change to CM to be staged")
  @PostMapping(value = "/staged-requests/shuttle-vehicle/{id}")
  public ResponseEntity<Void> updateVehicle(
      @PathVariable("id") Integer id, @RequestBody StagedRequest stagedRequest)
      throws JsonProcessingException {

    URI stagedRequestLocation = stagedRequestService.updateVehicle(id, stagedRequest);

    return ResponseEntity.created(stagedRequestLocation).build();
  }
}
