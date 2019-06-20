package com.uline.shuttle.app.services.impl;

import com.uline.shuttle.app.client.ShuttleAppClient;
import com.uline.shuttle.app.services.ShuttleAppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rest.models.requests.CoordRequest;
import rest.models.requests.ShiftRequest;
import rest.models.response.CoordResponse;
import rest.models.response.ShiftResponse;

@Service
public class ShuttleAppServiceImpl implements ShuttleAppService {

  // this class will handle any manipulations we need done with the data

  private ShuttleAppClient shuttleAppClient;

  @Autowired
  public ShuttleAppServiceImpl(ShuttleAppClient shuttleAppClient) {
    this.shuttleAppClient = shuttleAppClient;
  }

  @Override
  public CoordResponse enRoute(CoordRequest coordRequest) {
    return shuttleAppClient.enRoute(coordRequest);
  }

  @Override
  public ShiftResponse startShift(ShiftRequest shiftRequest) {
    return shuttleAppClient.startShift(shiftRequest);
  }
}