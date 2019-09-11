package com.uline.shuttle.app.services.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.uline.common.exception.BadRequestException;
import com.uline.ha.rest.UlineRestTemplate;
import com.uline.shuttle.app.client.ShuttleAppClient;
import com.uline.shuttle.app.configuration.DataContextConfig;
import com.uline.shuttle.app.configuration.DataContextConfig.Activity;
import com.uline.shuttle.app.services.StagedRequestService;
import java.io.IOException;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.util.UriComponentsBuilder;
import rest.models.requests.StagedRequest;
import rest.models.requests.StagedRequestConfig;
import rest.models.response.HttpErrorResponse;

@Service
public class StagedRequestServiceImpl implements StagedRequestService {

  private static final String DEFAULT_ERROR_MESSAGE = "An error has occurred on the service (%s)";
  private static final String EMPTY_JSON = "{}";

  @Autowired
  public StagedRequestServiceImpl(
      UlineRestTemplate restTemplate,
      DataContextConfig dataContextConfig,
      ShuttleAppClient shuttleClient) {
    this.shuttleClient = shuttleClient;
    this.restTemplate = restTemplate;
    this.dataContextConfig = dataContextConfig;
    this.objectMapper = new ObjectMapper();
    this.objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
  }

  @Value("${service.configuration.management.base.url}")
  private String configMngmntServiceUrl;

  private DataContextConfig dataContextConfig;

  private ObjectMapper objectMapper;

  private UlineRestTemplate restTemplate;

  private ShuttleAppClient shuttleClient;

  @Value("${service.configuration.management.staged.requests.url}")
  private String stagedRequestsUrl;

  private URI createStagedRequest(StagedRequest stagedRequest) {
    HttpEntity<Void> response = null;
    try {
      response =
          restTemplate.exchange(
              configMngmntServiceUrl + stagedRequestsUrl,
              HttpMethod.POST,
              new HttpEntity<>(stagedRequest),
              Void.class);
    } catch (HttpClientErrorException h) {
      // Propagate service error message to the client
      try {
        HttpErrorResponse errorResponse =
            objectMapper.readValue(
                h.getResponseBodyAsString(), new TypeReference<HttpErrorResponse>() {});
        throw new BadRequestException(errorResponse.getMessage());

      } catch (IOException i) {
        // If message can't be parsed, use default message with error status code.
        throw new BadRequestException(String.format(DEFAULT_ERROR_MESSAGE, h.getStatusCode()));
      }
    } catch (Exception e) {
      // Return exception message with 500 error code for any other exception
      throw new BadRequestException(e.getMessage() + " (" + HttpStatus.INTERNAL_SERVER_ERROR + ")");
    }

    return response.getHeaders().getLocation();
  }

  @Override
  public URI updateDayRecord(Integer id, String date, StagedRequest stagedRequestIn)
      throws JsonProcessingException {

    StagedRequestConfig stagedRequestConfig =
        dataContextConfig.getConfigForActivity(Activity.UPDATE_SHUTTLE_DAY);

    StagedRequest stagedRequest = new StagedRequest();
    stagedRequest.setDataContextId(stagedRequestConfig.getDataContextId());

    stagedRequest.setReturnServiceEndpoint(
        UriComponentsBuilder.fromHttpUrl(stagedRequestConfig.getServiceEndpoint())
            .buildAndExpand()
            .toUriString());

    stagedRequest.setReturnServiceMethod(stagedRequestConfig.getServiceMethod());
    stagedRequest.setOriginalJson(objectMapper.writeValueAsString(shuttleClient.getDay(date, id)));

    stagedRequest.setStagedJson(stagedRequestIn.getStagedJson());
    stagedRequest.setStagedRequestText(stagedRequestIn.getStagedRequestText());

    return createStagedRequest(stagedRequest);
  }

  @Override
  public URI updateVehicle(Integer id, StagedRequest stagedRequestIn)
      throws JsonProcessingException {

    String transferId = Integer.toString(id);

    StagedRequestConfig stagedRequestConfig =
        dataContextConfig.getConfigForActivity(Activity.UPDATE_SHUTTLE_VEHICLE);

    StagedRequest stagedRequest = new StagedRequest();
    stagedRequest.setDataContextId(stagedRequestConfig.getDataContextId());

    Map<String, Integer> params = new HashMap<>();
    params.put("id", id);

    stagedRequest.setReturnServiceEndpoint(
        UriComponentsBuilder.fromHttpUrl(stagedRequestConfig.getServiceEndpoint())
            .buildAndExpand(params)
            .toUriString());

    stagedRequest.setReturnServiceMethod(stagedRequestConfig.getServiceMethod());
    stagedRequest.setOriginalJson(
        objectMapper.writeValueAsString(shuttleClient.getShuttlesStatus(transferId)));

    stagedRequest.setStagedJson(stagedRequestIn.getStagedJson());
    stagedRequest.setStagedRequestText(stagedRequestIn.getStagedRequestText());

    return createStagedRequest(stagedRequest);
  }

  @Override
  public URI addDayRecord(StagedRequest stagedRequestIn) {
    return addDataContext(stagedRequestIn, Activity.ADD_SHUTTLE_DAY);
  }

  private URI addDataContext(StagedRequest stagedRequestIn, Activity dataContextActivity) {
    StagedRequestConfig stagedRequestConfig =
        dataContextConfig.getConfigForActivity(dataContextActivity);

    StagedRequest stagedRequest = new StagedRequest();
    stagedRequest.setDataContextId(stagedRequestConfig.getDataContextId());
    stagedRequest.setReturnServiceEndpoint(stagedRequestConfig.getServiceEndpoint());
    stagedRequest.setReturnServiceMethod(stagedRequestConfig.getServiceMethod());
    stagedRequest.setOriginalJson(EMPTY_JSON);
    stagedRequest.setStagedJson(stagedRequestIn.getStagedJson());
    stagedRequest.setStagedRequestText(stagedRequestIn.getStagedRequestText());

    return createStagedRequest(stagedRequest);
  }
}
