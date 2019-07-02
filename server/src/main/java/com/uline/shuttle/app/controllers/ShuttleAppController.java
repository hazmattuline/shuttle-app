package com.uline.shuttle.app.controllers;

import com.uline.common.metrics.ExecutionTime;
import com.uline.shuttle.app.services.ShuttleAppService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rest.models.requests.CoordinateRequest;
import rest.models.requests.FuelRequest;
import rest.models.requests.PassengerRequest;
import rest.models.requests.StartRequest;
import rest.models.requests.EndRequest;
import rest.models.response.CoordinateResponse;
import rest.models.response.FuelResponse;
import rest.models.response.PassengerResponse;
import rest.models.response.StartResponse;
import rest.models.response.VehicleOptionsResponse;
import rest.models.response.EndResponse;

@RestController
@RequestMapping("/api")
public class ShuttleAppController {

  private ShuttleAppService shuttleAppService;

  @Autowired
  public ShuttleAppController(ShuttleAppService shuttleAppService) {
    this.shuttleAppService = shuttleAppService;
  }
  
  @ExecutionTime("ShuttleAppService.endShift")
  @ApiOperation(value = "posting the ending conditions of the vehicle")
  @PostMapping(value = "/storeEndInformation")
  public EndResponse endShift(@RequestBody EndRequest endRequest) {
    return shuttleAppService.endShift(endRequest);
  }

  @ExecutionTime("ShuttleAppService.enRoute")
  @ApiOperation(value = "posting the coordinates and storing in a database")
  @PatchMapping(value = "/shuttles/{vehicleID}/coordinates")
  public CoordinateResponse enRoute(
      @PathVariable("vehicleID") Integer vehicleID,
      @RequestBody CoordinateRequest coordinateRequest) {
    return shuttleAppService.enRoute(vehicleID, coordinateRequest);
  }

  @ExecutionTime("ShuttleAppService.receiveCoordinates")
  @ApiOperation("fetching coordinates from the database")
  @GetMapping(value = "/shuttles/{vehicleID}/coordinates")
  public CoordinateResponse receiveCoordinates(@PathVariable("vehicleID") Integer vehicleID) {
    return this.shuttleAppService.getCoordinates(vehicleID);
  }

  @ExecutionTime("ShuttleAppService.receiveVehicleOptions")
  @ApiOperation(value = "fetching vehicles from database")
  @GetMapping(value = "/vehicles")
  public VehicleOptionsResponse receiveVehicles() {
    return shuttleAppService.getVehicles();
  }

  @ExecutionTime("ShuttleAppService.startShift")
  @ApiOperation(value = "posting the start of day details to the database")
  @PostMapping(value = "/days/start")
  public StartResponse startShift(@RequestBody StartRequest startRequest) {
    return shuttleAppService.startShift(startRequest);
  }

  @ExecutionTime("ShuttleAppService.storeFuel")
  @ApiOperation(value = "posting the fuel details to the database")
  @PostMapping(value = "/days/fuel")
  public FuelResponse storeFuel(@RequestBody FuelRequest fuelRequest) {
    return shuttleAppService.storeFuel(fuelRequest);
  }

  @ExecutionTime("ShuttleAppService.recordPassenger")
  @ApiOperation(value = "posting the passenger amount details to the database")
  @PostMapping(value = "/storePassengers")
  public PassengerResponse storePassengers(@RequestBody PassengerRequest passengerRequest) {
    return shuttleAppService.storePassengers(passengerRequest);
  }
}
