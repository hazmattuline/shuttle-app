package com.uline.shuttle.app.client.impl;

import org.springframework.stereotype.Service;

import com.uline.shuttle.app.client.ShuttleAppClient;

import rest.models.requests.CoordRequest;
import rest.models.requests.ShiftRequest;
import rest.models.response.CoordResponse;
import rest.models.response.ShiftResponse;

@Service
public class ShuttleAppClientImpl implements ShuttleAppClient {

  CoordResponse CR = new CoordResponse();
  ShiftResponse SR = new ShiftResponse();

  @Override
  public CoordResponse enRoute(CoordRequest coordRequest) {
    CR.setLatitudeCoords(743.343);
    CR.setLongitudeCoords(897.989);
    return CR;
  }

  @Override
  public ShiftResponse startShift(ShiftRequest shiftRequest) {
    SR.setDriverID(12345);
    SR.setId(123434556);
    return SR;
  }
}
