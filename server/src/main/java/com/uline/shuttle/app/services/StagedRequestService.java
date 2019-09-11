package com.uline.shuttle.app.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import java.net.URI;
import rest.models.requests.StagedRequest;

public interface StagedRequestService {

  URI updateDayRecord(Integer id, String date, StagedRequest stagedRequestIn)
      throws JsonProcessingException;

  URI updateVehicle(Integer id, StagedRequest stagedRequestIn) throws JsonProcessingException;

  URI addDayRecord(StagedRequest stagedRequestIn);
}
