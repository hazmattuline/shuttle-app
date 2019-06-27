package com.uline.shuttle.app.client.impl;

import com.uline.ha.rest.UlineRestTemplate;
import com.uline.shuttle.app.client.ShuttleAppClient;
import java.util.ArrayList;
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
import rest.models.requests.FuelRequest;
import rest.models.requests.PassengerRequest;
import rest.models.requests.StartRequest;
import rest.models.response.CoordinateResponse;
import rest.models.response.FuelResponse;
import rest.models.response.PassengerResponse;
import rest.models.response.StartResponse;
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

  @Value("${shuttle.service.rc.url.get.coordinates}")
  private String shuttleServiceForGet;

  @Value("${shuttle.service.rc.url.post.startOfShift}")
  private String shuttleServiceStartOfShift;

  @Value("${shuttle.service.rc.url.post.coordinates}")
  private String shuttleServiceUrl;

  @Value("${shuttle.service.rc.url.post.fuel}")
  private String shuttleServiceForFuel;

  @Autowired
  public ShuttleAppClientImpl(UlineRestTemplate restTemplate) {
    this.restTemplate = restTemplate;
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
  public VehicleOptionsResponse getVehicleOptions() {
    UriComponentsBuilder builder =
        UriComponentsBuilder.fromUriString(baseUrl + shuttleServiceForVehicleOptions);

    VehicleOptionsResponse vor = new VehicleOptionsResponse();
    List<Integer> ids = new ArrayList<Integer>();
    ids.add(1);
    ids.add(2);
    ids.add(3);
    vor.setIds(ids);
    List<String> names = new ArrayList<String>();
    names.add("a");
    names.add("b");
    names.add("c");
    vor.setVehicleNames(names);

    return vor;

    //    return restTemplate
    //        .exchange(
    //            builder.build().toUriString(),
    //            HttpMethod.GET,
    //            null,
    //            new ParameterizedTypeReference<VehicleOptionsResponse>() {})
    //        .getBody();
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

    PassengerResponse pr = new PassengerResponse();
    pr.setCurbCount(passengerRequest.getCurbCount());
    pr.setPassengerCount(passengerRequest.getPassengerCount());
    pr.setVehicleId(passengerRequest.getVehicleId());
    return pr;

    //    return restTemplate
    //        .exchange(
    //            builder.build().toUriString(),
    //            HttpMethod.POST,
    //            new HttpEntity<>(passengerRequest),
    //            new ParameterizedTypeReference<PassengerResponse>() {})
    //        .getBody();
  }
}
