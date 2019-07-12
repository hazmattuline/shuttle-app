package com.uline.shuttle.app.client.impl;

import com.uline.ha.rest.UlineRestTemplate;
import com.uline.shuttle.app.client.ShuttleAppClient;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;
import rest.models.requests.CoordinateRequest;
import rest.models.requests.DayRequest;
import rest.models.requests.PassengerRequest;
import rest.models.requests.StatusRequest;
import rest.models.response.CoordinateResponse;
import rest.models.response.DayResponse;
import rest.models.response.PassengerResponse;
import rest.models.response.ShuttleResponse;
import rest.models.response.VehicleOptionsResponse;

@Service
public class ShuttleAppClientImpl implements ShuttleAppClient {

  @Value("${shuttle.service.base.url}")
  private String baseUrl;

  private UlineRestTemplate restTemplate;

  @Value("${shuttle.service.rc.url.for.vehicle.options}")
  private String shuttleServiceForVehicleOptions;

  @Value("${shuttle.service.rc.url.post.passenger.data}")
  private String shuttleServiceForPassenger;

  @Value("${shuttle.service.rc.url.post.coordinates}")
  private String shuttleServiceUrl;

  @Value("${shuttle.service.rc.url.get.status.shuttles}")
  private String statusShuttlesURL;

  @Value("${shuttle.service.rc.url.change.status}")
  private String changeStatusURL;

  @Value("${shuttle.service.rc.url.submit.day}")
  private String submitDayURL;

  @Autowired
  public ShuttleAppClientImpl(UlineRestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  @Override
  public ShuttleResponse changeStatus(StatusRequest statusRequest, Integer id) {

    Map<String, Integer> params = new HashMap<>();
    params.put("id", id);

    UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(baseUrl + changeStatusURL);

    return restTemplate
        .exchange(
            builder.buildAndExpand(params).toUriString(),
            HttpMethod.PATCH,
            new HttpEntity<>(statusRequest),
            new ParameterizedTypeReference<ShuttleResponse>() {})
        .getBody();
  }

  @Override
  public CoordinateResponse enRoute(CoordinateRequest coordinateRequest) {

    UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(baseUrl + shuttleServiceUrl);

    return restTemplate
        .exchange(
            builder.build().toUriString(),
            HttpMethod.PATCH,
            new HttpEntity<>(coordinateRequest),
            new ParameterizedTypeReference<CoordinateResponse>() {})
        .getBody();
  }

  @Override
  public List<ShuttleResponse> getShuttlesStatus(String status) {
    Map<String, String> params = new HashMap<>();
    params.put("status", status);

    UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(baseUrl + statusShuttlesURL);

    return restTemplate
        .exchange(
            builder.buildAndExpand(params).toUriString(),
            HttpMethod.GET,
            new HttpEntity<>(null, null),
            new ParameterizedTypeReference<List<ShuttleResponse>>() {})
        .getBody();
  }

  @Override
  public VehicleOptionsResponse getVehicleOptions() {
    UriComponentsBuilder builder =
        UriComponentsBuilder.fromUriString(baseUrl + shuttleServiceForVehicleOptions);

    return restTemplate
        .exchange(
            builder.build().toUriString(),
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<VehicleOptionsResponse>() {})
        .getBody();
  }

  @Override
  public PassengerResponse storePassengers(PassengerRequest passengerRequest) {

    UriComponentsBuilder builder =
        UriComponentsBuilder.fromUriString(baseUrl + shuttleServiceForPassenger);

    return restTemplate
        .exchange(
            builder.build().toUriString(),
            HttpMethod.POST,
            new HttpEntity<>(passengerRequest),
            new ParameterizedTypeReference<PassengerResponse>() {})
        .getBody();
  }

  @Override
  public DayResponse submitDay(DayRequest dayRequest) {

    UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(baseUrl + submitDayURL);

    return restTemplate
        .exchange(
            builder.build().toUriString(),
            HttpMethod.POST,
            new HttpEntity<>(dayRequest),
            new ParameterizedTypeReference<DayResponse>() {})
        .getBody();
  }
}
