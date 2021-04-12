package com.uline.shuttle.clients;

import com.uline.ha.rest.UlineRestTemplate;
import com.uline.shuttle.app.client.impl.ShuttleAppClientImpl;
import java.util.Collections;
import java.util.List;
import org.apache.commons.lang3.reflect.FieldUtils;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import rest.models.requests.DayRequest;
import rest.models.requests.NoteRequest;
import rest.models.requests.ShuttleRequest;
import rest.models.requests.TripRequest;
import rest.models.response.DayResponse;
import rest.models.response.NoteResponse;
import rest.models.response.RouteResponse;
import rest.models.response.ShuttleResponse;
import rest.models.response.TripResponse;

@RunWith(MockitoJUnitRunner.class)
public class ShuttleAppClientTest {

  @InjectMocks ShuttleAppClientImpl shuttleAppClient;

  @Mock UlineRestTemplate ulineRestTemplate;

  ShuttleResponse shuttleResponse = new ShuttleResponse();

  @Before
  public void setup() throws IllegalAccessException {
    FieldUtils.writeField(shuttleAppClient, "baseUrl", "http://shuttle-service", true);
    FieldUtils.writeField(
        shuttleAppClient, "statusShuttlesURL", "/shuttles?status=status={status}", true);
    FieldUtils.writeField(
        shuttleAppClient, "shuttlePostCoordinates", "/shuttles/{id}/coordinates", true);
    FieldUtils.writeField(shuttleAppClient, "shuttleServiceForDayDetails", "/shuttle-trips", true);
    FieldUtils.writeField(shuttleAppClient, "changeStatusURL", "/shuttles/{id}/status", true);
    FieldUtils.writeField(shuttleAppClient, "submitDayURL", "/shuttle-days", true);
    FieldUtils.writeField(shuttleAppClient, "submitNoteURL", "/shuttle-notes", true);
    FieldUtils.writeField(
        shuttleAppClient, "getTripURL", "/shuttle-trips?date={date}&vehicle={vehicle}", true);
    FieldUtils.writeField(shuttleAppClient, "getRoutesURL", "/shuttle-routes", true);
    FieldUtils.writeField(
        shuttleAppClient, "getDayURL", "/shuttle-days?date={date}&vehicle={vehicle}", true);

    shuttleResponse.setLatitudeCoordinates(1d);
    shuttleResponse.setLongitudeCoordinates(1d);
    shuttleResponse.setName("Bailey");
    shuttleResponse.setPersonId(3);
    shuttleResponse.setRentalIndicator("N");
    shuttleResponse.setShuttleType("X");
    shuttleResponse.setVehicleId(5);
    shuttleResponse.setStatus("A");
  }

  @Test
  public void testChangeStatus() {
    ShuttleRequest shuttleRequest = new ShuttleRequest();
    shuttleRequest.setLatitudeCoordinates(1d);
    shuttleRequest.setLongitudeCoordinates(1d);
    shuttleRequest.setStatus("A");
    shuttleRequest.setVehicleId(5);

    Mockito.when(
            ulineRestTemplate.exchange(
                ArgumentMatchers.eq("http://shuttle-service/shuttles/3/status"),
                ArgumentMatchers.eq(HttpMethod.PATCH),
                ArgumentMatchers.any(HttpEntity.class),
                ArgumentMatchers.any(ParameterizedTypeReference.class)))
        .thenReturn(new ResponseEntity(shuttleResponse, HttpStatus.OK));

    ShuttleResponse shuttleResponse = shuttleAppClient.changeStatus(shuttleRequest, 3);

    Assert.assertNotNull(shuttleResponse);
    Assert.assertEquals(
        shuttleRequest.getLatitudeCoordinates(), shuttleResponse.getLatitudeCoordinates());
    Assert.assertEquals(
        shuttleRequest.getLongitudeCoordinates(), shuttleResponse.getLongitudeCoordinates());
    Assert.assertEquals(shuttleRequest.getVehicleId(), shuttleResponse.getVehicleId());
    Assert.assertEquals(shuttleRequest.getStatus(), shuttleResponse.getStatus());
    Assert.assertEquals("Bailey", shuttleResponse.getName());
    Assert.assertEquals("X", shuttleResponse.getShuttleType());
    Assert.assertEquals(Integer.valueOf(3), shuttleResponse.getPersonId());
    Assert.assertEquals("N", shuttleResponse.getRentalIndicator());
  }

  @Test
  public void testEnRoute() {
    ShuttleRequest shuttleRequest = new ShuttleRequest();
    shuttleRequest.setLatitudeCoordinates(1d);
    shuttleRequest.setLongitudeCoordinates(1d);
    shuttleRequest.setStatus("A");
    shuttleRequest.setVehicleId(5);

    Mockito.when(
            ulineRestTemplate.exchange(
                ArgumentMatchers.eq("http://shuttle-service/shuttles/3/coordinates"),
                ArgumentMatchers.eq(HttpMethod.PATCH),
                ArgumentMatchers.any(HttpEntity.class),
                ArgumentMatchers.any(ParameterizedTypeReference.class)))
        .thenReturn(new ResponseEntity(shuttleResponse, HttpStatus.OK));

    ShuttleResponse shuttleResponse = shuttleAppClient.enRoute(3, shuttleRequest);

    Assert.assertNotNull(shuttleResponse);
    Assert.assertEquals(
        shuttleRequest.getLatitudeCoordinates(), shuttleResponse.getLatitudeCoordinates());
    Assert.assertEquals(
        shuttleRequest.getLongitudeCoordinates(), shuttleResponse.getLongitudeCoordinates());
    Assert.assertEquals(shuttleRequest.getVehicleId(), shuttleResponse.getVehicleId());
    Assert.assertEquals(shuttleRequest.getStatus(), shuttleResponse.getStatus());
    Assert.assertEquals("Bailey", shuttleResponse.getName());
    Assert.assertEquals("X", shuttleResponse.getShuttleType());
    Assert.assertEquals(Integer.valueOf(3), shuttleResponse.getPersonId());
    Assert.assertEquals("N", shuttleResponse.getRentalIndicator());
  }

  @Test
  public void testGetDay() {
    DayResponse dayResponse = new DayResponse();
    dayResponse.setDate("10/10/20");
    dayResponse.setDayId(1);
    dayResponse.setEndCondition("BAD");
    dayResponse.setEndMileage(12d);
    dayResponse.setFuelCost(5d);
    dayResponse.setFuelQuantity(6d);
    dayResponse.setStartCondition("OK");
    dayResponse.setStartMileage(53d);
    dayResponse.setVehicleId(5);

    Mockito.when(
            ulineRestTemplate.exchange(
                ArgumentMatchers.eq("http://shuttle-service/shuttle-days?date=10/10/20&vehicle=5"),
                ArgumentMatchers.eq(HttpMethod.GET),
                ArgumentMatchers.any(HttpEntity.class),
                ArgumentMatchers.any(ParameterizedTypeReference.class)))
        .thenReturn(new ResponseEntity(Collections.singletonList(dayResponse), HttpStatus.OK));

    List<DayResponse> dayResponse1 = shuttleAppClient.getDay("10/10/20", 5);

    Assert.assertNotNull(dayResponse1);

    Assert.assertEquals(dayResponse1.get(0).getDate(), dayResponse.getDate());
    Assert.assertEquals(dayResponse1.get(0).getDayId(), dayResponse.getDayId());
    Assert.assertEquals(dayResponse1.get(0).getEndCondition(), dayResponse.getEndCondition());
    Assert.assertEquals(dayResponse1.get(0).getEndMileage(), dayResponse.getEndMileage());
    Assert.assertEquals(dayResponse1.get(0).getFuelCost(), dayResponse.getFuelCost());
    Assert.assertEquals(dayResponse1.get(0).getFuelQuantity(), dayResponse.getFuelQuantity());
    Assert.assertEquals(dayResponse1.get(0).getStartCondition(), dayResponse.getStartCondition());
    Assert.assertEquals(dayResponse1.get(0).getStartMileage(), dayResponse.getStartMileage());
    Assert.assertEquals(dayResponse1.get(0).getVehicleId(), dayResponse.getVehicleId());
  }

  @Test
  public void testGetRoutes() {
    RouteResponse routeResponse = new RouteResponse();
    routeResponse.setFromWarehouse("P6");
    routeResponse.setFromWarehouseDoor("P7");
    routeResponse.setId(3);
    routeResponse.setToWarehouse("I6");
    routeResponse.setToWarehouseDoor("I7");

    Mockito.when(
            ulineRestTemplate.exchange(
                ArgumentMatchers.eq("http://shuttle-service/shuttle-routes"),
                ArgumentMatchers.eq(HttpMethod.GET),
                ArgumentMatchers.any(HttpEntity.class),
                ArgumentMatchers.any(ParameterizedTypeReference.class)))
        .thenReturn(new ResponseEntity(Collections.singletonList(routeResponse), HttpStatus.OK));

    List<RouteResponse> routeResponses = shuttleAppClient.getRoutes();

    Assert.assertNotNull(routeResponses);

    Assert.assertEquals(routeResponses.get(0).getFromWarehouse(), routeResponse.getFromWarehouse());
    Assert.assertEquals(
        routeResponses.get(0).getFromWarehouseDoor(), routeResponse.getFromWarehouseDoor());
    Assert.assertEquals(routeResponses.get(0).getId(), routeResponse.getId());
    Assert.assertEquals(routeResponses.get(0).getToWarehouse(), routeResponse.getToWarehouse());
    Assert.assertEquals(
        routeResponses.get(0).getToWarehouseDoor(), routeResponse.getToWarehouseDoor());
  }

  @Test
  public void testGetShuttleStatus() {

    Mockito.when(
            ulineRestTemplate.exchange(
                ArgumentMatchers.eq("http://shuttle-service/shuttles?status=status=A"),
                ArgumentMatchers.eq(HttpMethod.GET),
                ArgumentMatchers.any(HttpEntity.class),
                ArgumentMatchers.any(ParameterizedTypeReference.class)))
        .thenReturn(new ResponseEntity(Collections.singletonList(shuttleResponse), HttpStatus.OK));

    List<ShuttleResponse> shuttleResponses = shuttleAppClient.getShuttlesStatus("A");

    Assert.assertNotNull(shuttleResponses);
    Assert.assertEquals(
        shuttleResponses.get(0).getLatitudeCoordinates(), shuttleResponse.getLatitudeCoordinates());
    Assert.assertEquals(
        shuttleResponses.get(0).getLongitudeCoordinates(),
        shuttleResponse.getLongitudeCoordinates());
    Assert.assertEquals(shuttleResponses.get(0).getVehicleId(), shuttleResponse.getVehicleId());
    Assert.assertEquals(shuttleResponses.get(0).getStatus(), shuttleResponse.getStatus());
    Assert.assertEquals(shuttleResponses.get(0).getName(), shuttleResponse.getName());
    Assert.assertEquals(shuttleResponses.get(0).getShuttleType(), shuttleResponse.getShuttleType());
    Assert.assertEquals(shuttleResponses.get(0).getPersonId(), shuttleResponse.getPersonId());
    Assert.assertEquals(
        shuttleResponses.get(0).getRentalIndicator(), shuttleResponse.getRentalIndicator());
  }

  @Test
  public void testGetTrip() {

    TripResponse tripResponse = new TripResponse();
    tripResponse.setActivityTimestamp("1234");
    tripResponse.setCurbCount(5);
    tripResponse.setDate("10/10/20");
    tripResponse.setDayId(5);
    tripResponse.setId(6);
    tripResponse.setPassengerCount(12);
    tripResponse.setRouteId(1);
    tripResponse.setVehicleId(6);

    Mockito.when(
            ulineRestTemplate.exchange(
                ArgumentMatchers.eq("http://shuttle-service/shuttle-trips?date=10/10/20&vehicle=6"),
                ArgumentMatchers.eq(HttpMethod.GET),
                ArgumentMatchers.any(HttpEntity.class),
                ArgumentMatchers.any(ParameterizedTypeReference.class)))
        .thenReturn(new ResponseEntity(tripResponse, HttpStatus.OK));

    TripResponse tripResponse1 = shuttleAppClient.getTrip("10/10/20", 6);

    Assert.assertNotNull(tripResponse1);
    Assert.assertEquals(tripResponse.getActivityTimestamp(), tripResponse1.getActivityTimestamp());
    Assert.assertEquals(tripResponse.getCurbCount(), tripResponse1.getCurbCount());
    Assert.assertEquals(tripResponse.getDate(), tripResponse1.getDate());
    Assert.assertEquals(tripResponse.getDayId(), tripResponse1.getDayId());
    Assert.assertEquals(tripResponse.getId(), tripResponse1.getId());
    Assert.assertEquals(tripResponse.getPassengerCount(), tripResponse1.getPassengerCount());
    Assert.assertEquals(tripResponse.getRouteId(), tripResponse1.getRouteId());
    Assert.assertEquals(tripResponse.getVehicleId(), tripResponse1.getVehicleId());
  }

  @Test
  public void testPostTrip() {

    TripResponse tripResponse = new TripResponse();
    tripResponse.setActivityTimestamp("1234");
    tripResponse.setCurbCount(5);
    tripResponse.setDate("10/10/20");
    tripResponse.setDayId(5);
    tripResponse.setId(6);
    tripResponse.setPassengerCount(12);
    tripResponse.setRouteId(1);
    tripResponse.setVehicleId(6);

    TripRequest tripRequest = new TripRequest();
    tripRequest.setCurbCount(5);
    tripRequest.setDate("10/10/20");
    tripRequest.setId(6);
    tripRequest.setPassengerCount(12);
    tripRequest.setRouteId(1);
    tripRequest.setVehicleId(6);

    Mockito.when(
            ulineRestTemplate.exchange(
                ArgumentMatchers.eq("http://shuttle-service/shuttle-trips"),
                ArgumentMatchers.eq(HttpMethod.POST),
                ArgumentMatchers.any(HttpEntity.class),
                ArgumentMatchers.any(ParameterizedTypeReference.class)))
        .thenReturn(new ResponseEntity(tripResponse, HttpStatus.OK));

    TripResponse tripResponse1 = shuttleAppClient.postTrip(tripRequest);

    Assert.assertNotNull(tripResponse1);
    Assert.assertEquals(tripRequest.getCurbCount(), tripResponse1.getCurbCount());
    Assert.assertEquals(tripRequest.getDate(), tripResponse1.getDate());
    Assert.assertEquals(tripRequest.getId(), tripResponse1.getId());
    Assert.assertEquals(tripRequest.getPassengerCount(), tripResponse1.getPassengerCount());
    Assert.assertEquals(tripRequest.getRouteId(), tripResponse1.getRouteId());
    Assert.assertEquals(tripRequest.getVehicleId(), tripResponse1.getVehicleId());
  }

  @Test
  public void testSubmitDay() {

    DayResponse dayResponse = new DayResponse();
    dayResponse.setVehicleId(1);
    dayResponse.setStartMileage(5d);
    dayResponse.setStartCondition("GOOD");
    dayResponse.setFuelQuantity(8d);
    dayResponse.setFuelCost(5d);
    dayResponse.setEndMileage(9d);
    dayResponse.setEndCondition("BAD");
    dayResponse.setDayId(1);
    dayResponse.setDate("10/10/20");

    DayRequest dayRequest = new DayRequest();
    dayRequest.setVehicleId(1);
    dayRequest.setStartMileage(5d);
    dayRequest.setStartCondition("GOOD");
    dayRequest.setFuelQuantity(8d);
    dayRequest.setFuelCost(5d);
    dayRequest.setEndMileage(9);
    dayRequest.setEndCondition("BAD");
    dayRequest.setDate("10/10/20");

    Mockito.when(
            ulineRestTemplate.exchange(
                ArgumentMatchers.eq("http://shuttle-service/shuttle-days"),
                ArgumentMatchers.eq(HttpMethod.POST),
                ArgumentMatchers.any(HttpEntity.class),
                ArgumentMatchers.any(ParameterizedTypeReference.class)))
        .thenReturn(new ResponseEntity(dayResponse, HttpStatus.OK));

    DayResponse dayResponse1 = shuttleAppClient.submitDay(dayRequest);

    Assert.assertNotNull(dayResponse1);
    Assert.assertEquals(dayRequest.getDate(), dayResponse1.getDate());
    Assert.assertEquals(dayRequest.getEndCondition(), dayResponse1.getEndCondition());
    Assert.assertEquals(Double.valueOf(dayRequest.getEndMileage()), dayResponse1.getEndMileage());
    Assert.assertEquals(dayRequest.getFuelCost(), dayResponse1.getFuelCost());
    Assert.assertEquals(dayRequest.getFuelQuantity(), dayResponse1.getFuelQuantity());
    Assert.assertEquals(dayRequest.getStartCondition(), dayResponse1.getStartCondition());
    Assert.assertEquals(dayRequest.getStartMileage(), dayResponse1.getStartMileage());
    Assert.assertEquals(dayRequest.getVehicleId(), dayResponse1.getVehicleId());
    Assert.assertEquals(Integer.valueOf(1), dayResponse1.getDayId());
  }

  @Test
  public void testSubmitNote() {

    NoteResponse noteResponse = new NoteResponse();
    noteResponse.setDate("10/10/20");
    noteResponse.setDayId(1);
    noteResponse.setId(5);
    noteResponse.setMessage("GOOD");
    noteResponse.setSequenceNumber(1);
    noteResponse.setVehicleId(3);

    NoteRequest noteRequest = new NoteRequest();
    noteRequest.setDate("10/10/20");
    noteRequest.setMessage("GOOD");
    noteRequest.setVehicleId(3);

    Mockito.when(
            ulineRestTemplate.exchange(
                ArgumentMatchers.eq("http://shuttle-service/shuttle-notes"),
                ArgumentMatchers.eq(HttpMethod.POST),
                ArgumentMatchers.any(HttpEntity.class),
                ArgumentMatchers.any(ParameterizedTypeReference.class)))
        .thenReturn(new ResponseEntity(noteResponse, HttpStatus.OK));

    NoteResponse noteResponse1 = shuttleAppClient.submitNote(noteRequest);

    Assert.assertNotNull(noteResponse1);
    Assert.assertEquals(noteRequest.getMessage(), noteResponse1.getMessage());
    Assert.assertEquals(noteRequest.getDate(), noteResponse1.getDate());
    Assert.assertEquals(noteRequest.getVehicleId(), noteResponse1.getVehicleId());
    Assert.assertEquals(Integer.valueOf(1), noteResponse1.getDayId());
    Assert.assertEquals(Integer.valueOf(5), noteResponse1.getId());
    Assert.assertEquals(Integer.valueOf(1), noteResponse1.getSequenceNumber());
  }
}
