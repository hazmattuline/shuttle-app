package com.uline.shuttle.app.client.impl;

import com.uline.ha.rest.UlineRestTemplate;
import com.uline.shuttle.app.client.ShuttleAppClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;
import rest.models.requests.CoordRequest;
import rest.models.requests.ShiftRequest;
import rest.models.response.CoordResponse;
import rest.models.response.ShiftResponse;

@Service
public class ShuttleAppClientImpl implements ShuttleAppClient {

  @Value("${shuttle.service.base.url}")
  private String baseUrl;

  private UlineRestTemplate restTemplate;

  @Value("${shuttle.service.rc.url}")
  private String shuttleServiceUrl;

  @Autowired
  public ShuttleAppClientImpl(UlineRestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  @Override
  public CoordResponse enRoute(CoordRequest coordRequest) {

    UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(baseUrl + shuttleServiceUrl);

    return restTemplate
        .exchange(
            builder.build().toUriString(),
            HttpMethod.POST,
            new HttpEntity<>(coordRequest),
            new ParameterizedTypeReference<CoordResponse>() {})
        .getBody();
  }

  @Override
  public ShiftResponse startShift(ShiftRequest shiftRequest) {

    return null;
  }
}
