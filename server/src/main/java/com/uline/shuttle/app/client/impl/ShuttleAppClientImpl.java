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
import rest.models.requests.EndRequest;
import rest.models.requests.FuelRequest;
import rest.models.requests.PassengerRequest;
import rest.models.requests.StartRequest;
import rest.models.requests.StatusRequest;
import rest.models.response.CoordinateResponse;
import rest.models.response.EndResponse;
import rest.models.response.FuelResponse;
import rest.models.response.PassengerResponse;
import rest.models.response.ShuttleResponse;
import rest.models.response.StartResponse;
import rest.models.response.VehicleOptionsResponse;

@Service
public class ShuttleAppClientImpl implements ShuttleAppClient {

  @Value("${shuttle.service.rc.url.get.active.shuttles}")
  private String activeShuttlesURL;

  @Value("${shuttle.service.base.url}")
  private String baseUrl;

  @Value("${shuttle.service.rc.url.change.status}")
  private String changeStatusURL;

  @Value("${shuttle.service.rc.url.end.of.shift}")
  private String endShiftUrl;

  private UlineRestTemplate restTemplate;

  @Value("${shuttle.service.rc.url.post.coordinates}")
  private String shuttlePostCoordinates;

  @Value("${shuttle.service.rc.url.post.fuel}")
  private String shuttleServiceForFuel;

  @Value("${shuttle.service.rc.url.get.coordinates}")
  private String shuttleServiceForGet;

  @Value("${shuttle.service.rc.url.post.passenger.data}")
  private String shuttleServiceForPassenger;

  @Value("${shuttle.service.rc.url.for.vehicle.options}")
  private String shuttleServiceForVehicleOptions;

  @Value("${shuttle.service.rc.url.post.startOfShift}")
  private String shuttleServiceStartOfShift;

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
  public EndResponse endShift(EndRequest endRequest) {
    UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(baseUrl + endShiftUrl);

    return restTemplate
        .exchange(
            builder.build().toUriString(),
            HttpMethod.POST,
            new HttpEntity<>(endRequest),
            new ParameterizedTypeReference<EndResponse>() {})
        .getBody();
  }

  @Override
  public CoordinateResponse enRoute(Integer vehicleID, CoordinateRequest coordinateRequest) {

    Map<String, Integer> params = new HashMap<>();
    params.put("vehicleID", vehicleID);

    UriComponentsBuilder builder =
        UriComponentsBuilder.fromUriString(baseUrl + shuttlePostCoordinates);

    return restTemplate
        .exchange(
            builder.buildAndExpand(params).toUriString(),
            HttpMethod.PATCH,
            new HttpEntity<>(coordinateRequest),
            new ParameterizedTypeReference<CoordinateResponse>() {})
        .getBody();
  }

  @Override
  public List<ShuttleResponse> getActiveShuttles() {
    UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(baseUrl + activeShuttlesURL);

    return restTemplate
        .exchange(
            builder.build().toUriString(),
            HttpMethod.GET,
            new HttpEntity<>(null, null),
            new ParameterizedTypeReference<List<ShuttleResponse>>() {})
        .getBody();
  }

  @Override
  public CoordinateResponse getCoordinates(Integer vehicleID) {

    Map<String, Integer> params = new HashMap<>();
    params.put("vehicleID", vehicleID);

    UriComponentsBuilder builder =
        UriComponentsBuilder.fromUriString(baseUrl + shuttleServiceForGet);

    return restTemplate
        .exchange(
            builder.buildAndExpand(params).toUriString(),
            HttpMethod.GET,
            new HttpEntity<>(null, null),
            new ParameterizedTypeReference<CoordinateResponse>() {})
        .getBody();
  }

  @Override
  public List<VehicleOptionsResponse> getVehicles() {
    UriComponentsBuilder builder =
        UriComponentsBuilder.fromUriString(baseUrl + shuttleServiceForVehicleOptions);

    return restTemplate
        .exchange(
            builder.build().toUriString(),
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<List<VehicleOptionsResponse>>() {})
        .getBody();
  }

  @Override
  public StartResponse startShift(StartRequest startRequest) {

    UriComponentsBuilder builder =
        UriComponentsBuilder.fromUriString(baseUrl + shuttleServiceStartOfShift);

    return restTemplate
        .exchange(
            builder.build().toUriString(),
            HttpMethod.POST,
            new HttpEntity<>(startRequest),
            new ParameterizedTypeReference<StartResponse>() {})
        .getBody();
  }

  @Override
  public FuelResponse storeFuel(FuelRequest fuelRequest) {
    UriComponentsBuilder builder =
        UriComponentsBuilder.fromUriString(baseUrl + shuttleServiceForFuel);

    return restTemplate
        .exchange(
            builder.build().toUriString(),
            HttpMethod.POST,
            new HttpEntity<>(fuelRequest),
            new ParameterizedTypeReference<FuelResponse>() {})
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
}
