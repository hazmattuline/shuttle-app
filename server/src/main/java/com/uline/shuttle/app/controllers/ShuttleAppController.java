package com.uline.shuttle.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uline.common.metrics.ExecutionTime;
import com.uline.shuttle.app.services.ShuttleAppService;

import io.swagger.annotations.ApiOperation;
import rest.models.requests.CoordinateRequest;
import rest.models.requests.ShiftRequest;
import rest.models.response.CoordinateResponse;
import rest.models.response.ShiftResponse;

@RestController
@RequestMapping("/api")
public class ShuttleAppController {

  private ShuttleAppService shuttleAppService;

  @Autowired
  public ShuttleAppController(ShuttleAppService shuttleAppService) {
    this.shuttleAppService = shuttleAppService;
  }

  @ExecutionTime("ShuttleAppService.enRoute")
  @ApiOperation(value = "posting the coordinates that we get from driver view and storing in a database")
  @PostMapping(value = "/enRoute")
  public CoordinateResponse enRoute(@RequestBody CoordinateRequest coordinateRequest) {
    return shuttleAppService.enRoute(coordinateRequest);
  }


  @ApiOperation("value getting the coordinates from the database")
  @GetMapping(value = "/receiveCoords")
  public CoordinateResponse receiveCoordinates() {
    return this.shuttleAppService.getCoordinates();

  }

  @PostMapping(value = "/startShift")
  public ShiftResponse startShift(@RequestBody ShiftRequest shiftRequest) {

    return shuttleAppService.startShift(shiftRequest);
  }


}
