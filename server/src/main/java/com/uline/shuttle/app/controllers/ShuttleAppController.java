package com.uline.shuttle.app.controllers;

import com.uline.common.metrics.ExecutionTime;
import com.uline.security.model.UserContext;
import com.uline.shuttle.app.services.ShuttleAppService;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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

@RestController
@RequestMapping("/api")
public class ShuttleAppController {

  private ShuttleAppService shuttleAppService;

  @Autowired
  public ShuttleAppController(ShuttleAppService shuttleAppService) {
    this.shuttleAppService = shuttleAppService;
  }

  @ExecutionTime("ShuttleAppService.changeStatus")
  @ApiOperation(value = "change shuttle's status")
  @PatchMapping(value = "/shuttles/{id}/status")
  public ShuttleResponse changeStatus(
      @RequestBody StatusRequest statusRequest, @PathVariable("id") Integer id) {
    return shuttleAppService.changeStatus(statusRequest, id);
  }

  @ExecutionTime("ShuttleAppService.enRoute")
  @ApiOperation(value = "posting the coordinates and storing in a database")
  @PatchMapping(value = "/shuttles/{vehicleID}/coordinates")
  public CoordinateResponse enRoute(
      @PathVariable("vehicleID") Integer vehicleID,
      @RequestBody CoordinateRequest coordinateRequest) {
    return shuttleAppService.enRoute(vehicleID, coordinateRequest);
  }

  @ApiOperation(value = "getting day from the database")
  @GetMapping(value = "/shuttle-days")
  public DayResponse getDay(
      @RequestParam(value = "date") String date,
      @RequestParam(value = "vehicle") Integer vehicleId) {
    return shuttleAppService.getDay(date, vehicleId);
  }

  @ExecutionTime("ShuttleAppService.getRoutes")
  @ApiOperation(value = "getting the routes from the database")
  @GetMapping(value = "/shuttle-routes")
  public List<RouteResponse> getRoutes(@AuthenticationPrincipal UserContext userContext) {
    System.out.println(userContext.getToken());
    return shuttleAppService.getRoutes();
  }

  @ExecutionTime("ShuttleAppService.getShuttlesStatus")
  @ApiOperation(value = "getting the shuttles by status")
  @GetMapping(value = "/shuttles")
  public List<ShuttleResponse> getShuttlesStatus(
      @RequestParam(name = "status", required = false) String status) {
    return shuttleAppService.getShuttlesStatus(status);
  }

  @ExecutionTime("ShuttleAppService.getTrip")
  @ApiOperation(value = "getting the passenger amount details from the database")
  @GetMapping(value = "/shuttle-trips")
  public ShuttleDayDetailsResponse getTrip(
      @RequestParam(value = "date") String date,
      @RequestParam(value = "vehicle") Integer vehicleId) {
    return shuttleAppService.getTrip(date, vehicleId);
  }

  @ExecutionTime("ShuttleAppService.postTrip")
  @ApiOperation(value = "posting the trip details to the database")
  @PostMapping(value = "/shuttle-trips")
  public ShuttleDayDetailsResponse postTrip(
      @RequestBody ShuttleDayDetailsRequest shuttleDayRequest) {
    return shuttleAppService.postTrip(shuttleDayRequest);
  }

  @ExecutionTime("ShuttleAppService.submitDay")
  @ApiOperation(value = "posting to the Shuttle Vehicle Day table")
  @PostMapping(value = "/shuttle-days")
  public DayResponse submitDay(@RequestBody DayRequest dayRequest) {
    return shuttleAppService.submitDay(dayRequest);
  }

  @ExecutionTime("ShuttleAppService.submitNote")
  @ApiOperation(value = "posting note to database")
  @PostMapping(value = "/shuttle-notes")
  public NoteResponse submitNote(@RequestBody NoteRequest noteRequest) {
    return shuttleAppService.submitNote(noteRequest);
  }
}
