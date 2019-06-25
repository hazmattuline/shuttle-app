package com.uline.shuttle.app.client.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import com.uline.ha.rest.UlineRestTemplate;
import com.uline.shuttle.app.client.ShuttleAppClient;

import rest.models.requests.CoordinateRequest;
import rest.models.requests.StartRequest;
import rest.models.response.CoordinateResponse;
import rest.models.response.StartResponse;

@Service
public class ShuttleAppClientImpl implements ShuttleAppClient {

  @Value("${shuttle.service.base.url}")
  private String baseUrl;

  private UlineRestTemplate restTemplate;

  @Value("${shuttle.service.rc.url.get.coordinates}")
  private String shuttleServiceForGet;

  @Value("${shuttle.service.rc.url.post.startOfShift}")
  private String ShuttleServiceStartOfShift;

  @Value("${shuttle.service.rc.url.post.coordinates}")
  private String shuttleServiceUrl;

  @Autowired
  public ShuttleAppClientImpl(UlineRestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  @Override
  public CoordinateResponse enRoute(CoordinateRequest coordinateRequest) {

    UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(baseUrl + shuttleServiceUrl);

    return restTemplate.exchange(builder.build().toUriString(), HttpMethod.PATCH, new HttpEntity<>(coordinateRequest),
        new ParameterizedTypeReference<CoordinateResponse>() {}).getBody();
  }

  @Override
  public CoordinateResponse getCoordinates(Integer vehicleID) {

    Map<String, Integer> params = new HashMap<>();
    params.put("vehicleID", vehicleID);

    UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(baseUrl + shuttleServiceForGet);

    return restTemplate.exchange(builder.buildAndExpand(params).toUriString(), HttpMethod.GET,
        new HttpEntity<>(null, null), new ParameterizedTypeReference<CoordinateResponse>() {}).getBody();
  }

  @Override
  public StartResponse startShift(StartRequest startRequest) {

    UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(baseUrl + ShuttleServiceStartOfShift);

    return restTemplate.exchange(builder.build().toUriString(), HttpMethod.POST, new HttpEntity<>(startRequest),
        new ParameterizedTypeReference<StartResponse>() {}).getBody();
  }
}
