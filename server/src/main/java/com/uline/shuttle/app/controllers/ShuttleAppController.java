package com.uline.shuttle.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uline.common.metrics.ExecutionTime;
import com.uline.shuttle.app.services.ShuttleAppService;

import io.swagger.annotations.ApiOperation;
import rest.models.requests.CoordRequest;
import rest.models.requests.ShiftRequest;
import rest.models.response.CoordResponse;
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
  public CoordResponse enRoute(@RequestBody CoordRequest coordRequest) {
    return shuttleAppService.enRoute(coordRequest);
  }

  @PostMapping(value = "/startShift")
  public ShiftResponse startShift(@RequestBody ShiftRequest shiftRequest) {

    return shuttleAppService.startShift(shiftRequest);
  }
}