package com.uline.shuttle.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uline.shuttle.app.services.ShuttleAppService;

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

  @PostMapping(value = "/enRoute")
  public CoordResponse enRoute(@RequestBody CoordRequest coordRequest) {
    System.err.println("Coords");
    return shuttleAppService.enRoute(coordRequest);
  }

  @PostMapping(value = "/startShift")
  public ShiftResponse startShift(@RequestBody ShiftRequest shiftRequest) {
    System.err.println("here");
    // System.err.println(SR.toString());
    return shuttleAppService.startShift(shiftRequest);
  }
}
