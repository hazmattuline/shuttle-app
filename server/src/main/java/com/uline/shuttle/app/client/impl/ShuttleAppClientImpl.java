package com.uline.shuttle.app.client.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import com.uline.ha.rest.UlineRestTemplate;
import com.uline.shuttle.app.client.ShuttleAppClient;

import rest.models.requests.CoordRequest;
import rest.models.requests.ShiftRequest;
import rest.models.response.CoordResponse;
import rest.models.response.ShiftResponse;

@Service
public class ShuttleAppClientImpl implements ShuttleAppClient {

  @Value("${shuttle.service.base.url}")
  private String baseUrl;

  @Value("${shuttle.service.rc.url}")
  private String communicationUrl;


  private UlineRestTemplate restTemplate;

  private ShiftResponse SR = new ShiftResponse();

  @Autowired
  public ShuttleAppClientImpl(UlineRestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  @Override
  public CoordResponse enRoute(CoordRequest coordRequest) {

    UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(baseUrl + communicationUrl);

    return restTemplate.exchange(builder.build().toUriString(), HttpMethod.POST, new HttpEntity<>(coordRequest),
        new ParameterizedTypeReference<CoordResponse>() {}).getBody();
  }

  @Override
  public ShiftResponse startShift(ShiftRequest shiftRequest) {

    return SR;
  }
}
