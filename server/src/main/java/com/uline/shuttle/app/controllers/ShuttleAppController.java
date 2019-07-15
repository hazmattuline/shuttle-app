package com.uline.shuttle.app.controllers;

import com.uline.common.metrics.ExecutionTime;
import com.uline.shuttle.app.services.ShuttleAppService;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
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
import rest.models.requests.ShuttleDayDetailsRequest;
import rest.models.requests.StatusRequest;
import rest.models.response.CoordinateResponse;
import rest.models.response.DayResponse;
import rest.models.response.ShuttleDayDetailsResponse;
import rest.models.response.ShuttleResponse;
import rest.models.response.VehicleOptionsResponse;

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

  @ExecutionTime("ShuttleAppService.receiveVehicleOptions")
  @ApiOperation(value = "fetching vehicles from database")
  @GetMapping(value = "/shuttles/vehicles")
  public List<VehicleOptionsResponse> receiveVehicles() {
    return shuttleAppService.getVehicles();
  }

  @ExecutionTime("ShuttleAppService.recordPassenger")
  @ApiOperation(value = "posting the passenger amount details to the database")
  @PostMapping(value = "/shuttle-day-details")
  public ShuttleDayDetailsResponse getShuttleDayDetails(
      @RequestBody ShuttleDayDetailsRequest shuttleDayRequest) {
    return shuttleAppService.getShuttleDayDetails(shuttleDayRequest);
  }

  @ExecutionTime("ShuttleAppService.getShuttlesStatus")
  @ApiOperation(value = "getting the shuttles by status")
  @GetMapping(value = "/shuttles")
  public List<ShuttleResponse> getShuttlesStatus(@RequestParam(name = "status") String status) {
    return shuttleAppService.getShuttlesStatus(status);
  }

  @ExecutionTime("ShuttleAppService.submitDay")
  @ApiOperation(value = "posting to the Shuttle Vehicle Day table")
  @PostMapping(value = "/shuttle-days")
  public DayResponse submitDay(@RequestBody DayRequest dayRequest) {
    return shuttleAppService.submitDay(dayRequest);
  }
}
